import { z } from "zod"

export const rpcErrorSchema = z
  .object({
    message: z.string(),
    code: z.string().nullish(),
    details: z.string().nullish(),
    hint: z.string().nullish(),
  })
  .passthrough()

export type RpcError = z.infer<typeof rpcErrorSchema>

export class PageWriteError extends Error {
  override readonly name = "PageWriteError"
  readonly code: string | undefined
  readonly details: string | undefined
  readonly hint: string | undefined

  constructor(label: string, error: RpcError) {
    super(`${label}: ${error.message}`)
    this.code = error.code ?? undefined
    this.details = error.details ?? undefined
    this.hint = error.hint ?? undefined
  }
}
