export function classifyCommittedServed(status: number): "splice" | "error-frame" {
  return status >= 200 && status < 300 ? "splice" : "error-frame"
}

const SSE_ERROR_TYPE_BY_STATUS: Record<number, string> = {
  400: "invalid_request_error",
  401: "authentication_error",
  403: "permission_error",
  404: "not_found_error",
  413: "request_too_large",
  429: "rate_limit_error",
  503: "overloaded_error",
  529: "overloaded_error",
}

export function mapStatusToSseError(status: number): { errorType: string; message: string } {
  return {
    errorType: SSE_ERROR_TYPE_BY_STATUS[status] ?? "api_error",
    message: `Upstream returned status ${status} after the response committed to a streaming keepalive hold`,
  }
}
