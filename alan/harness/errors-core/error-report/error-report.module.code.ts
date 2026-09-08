import * as z from "zod"

export const ErrorReportSchema = z
  .object({
    message: z.string().max(2048),
    stack: z.string().max(16384),
    kind: z.enum([
      "error",
      "unhandledrejection",
      "react-render",
      "webview-process-terminated",
      "native-crash",
    ]),
    app: z.enum([
      "alanwalton",
      "temper",
      "audhdalan",
      "archive-of-worlds",
      "atlas",
      "smilingjenny",
      "alanwalton-native",
    ]),
    url: z.string().max(2048),
    userAgent: z.string().max(1024),
    releaseSha: z.string().max(64).optional(),
    errorUserId: z.string().max(64).nullable(),
  })
  .strict()

export type ErrorReport = z.infer<typeof ErrorReportSchema>
