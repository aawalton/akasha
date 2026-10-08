import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const loginCode = {
  id: "01a0f115-66a6-7bf7-b285-2efdb32446f5",
  type: "page-type/argument",
  slug: "login-code",
  said: "--code",
  takes: "the code a sign-in page shows once its person has signed in",
  value: "text",
  placeholder: "code",
  createdAt: "2026-09-30T06:51:46.726Z",
  updatedAt: "2026-09-30T06:51:51.000Z",
} as const satisfies Argument
