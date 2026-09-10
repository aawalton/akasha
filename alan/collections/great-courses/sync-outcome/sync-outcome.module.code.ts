export const ERROR_TYPE = {
  NETWORK: "network",
  AUTHENTICATION: "auth",
  RATE_LIMIT: "rate_limit",
  NOT_FOUND: "not_found",
  VALIDATION: "validation",
  BUSINESS_LOGIC: "business_logic",
  UNKNOWN: "unknown",
} as const
export type ErrorType = (typeof ERROR_TYPE)[keyof typeof ERROR_TYPE]

export interface SyncResult {
  readonly created: number
  readonly updated: number
  readonly skipped: number
  readonly failed: number
}

export interface RetryConfig {
  readonly maxRetries: number
  readonly baseDelay: number
  readonly maxDelay: number
}

const RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 10_000,
}

export function toError(value: unknown): Error {
  if (value instanceof Error) return value
  if (typeof value === "string") return new Error(value)
  try {
    return new Error(JSON.stringify(value))
  } catch {
    return new Error(String(value))
  }
}

export function classifyError(error: Error): ErrorType {
  const message = error.message.toLowerCase()
  if (
    message.includes("http 401") ||
    message.includes("http 403") ||
    message.includes("unauthorized") ||
    message.includes("forbidden")
  ) {
    return ERROR_TYPE.AUTHENTICATION
  }
  if (message.includes("http 429") || message.includes("rate limit")) return ERROR_TYPE.RATE_LIMIT
  if (message.includes("http 404") || message.includes("not found")) return ERROR_TYPE.NOT_FOUND
  if (message.includes("http 5") || message.includes("timeout") || message.includes("network")) {
    return ERROR_TYPE.NETWORK
  }
  if (message.includes("invalid") || message.includes("malformed") || message.includes("missing")) {
    return ERROR_TYPE.VALIDATION
  }
  if (message.includes("empty")) return ERROR_TYPE.BUSINESS_LOGIC
  return ERROR_TYPE.UNKNOWN
}

function retryable(errorType: ErrorType): boolean {
  return errorType === ERROR_TYPE.NETWORK || errorType === ERROR_TYPE.RATE_LIMIT
}

export function logError(
  context: string,
  item: string,
  error: Error,
  errorType: ErrorType,
  metadata?: Readonly<Record<string, unknown>>
): undefined {
  console.error(`${context}: ${item}:`, {
    message: error.message,
    type: errorType,
    at: new Date().toISOString(),
    metadata,
  })
}

export async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  config: RetryConfig = RETRY_CONFIG
): Promise<T> {
  for (let attempt = 1; attempt <= config.maxRetries; attempt++) {
    try {
      return await operation()
    } catch (thrown) {
      const errorType = classifyError(toError(thrown))
      if (attempt === config.maxRetries || !retryable(errorType)) throw thrown
      const wait = Math.min(config.baseDelay * 2 ** (attempt - 1), config.maxDelay)
      console.log(`Retry ${attempt}/${config.maxRetries} in ${wait}ms...`)
      await Bun.sleep(wait)
    }
  }
  throw new Error("retry logic exhausted without a result and without a throw")
}

export function safeUpdateResult(error: Error): SyncResult {
  logError("Update operation", "unknown", error, classifyError(error))
  return { created: 0, updated: 0, skipped: 0, failed: 1 }
}

export function combineSyncResults(results: readonly SyncResult[]): SyncResult {
  return results.reduce(
    (total, result) => ({
      created: total.created + result.created,
      updated: total.updated + result.updated,
      skipped: total.skipped + result.skipped,
      failed: total.failed + result.failed,
    }),
    { created: 0, updated: 0, skipped: 0, failed: 0 }
  )
}
