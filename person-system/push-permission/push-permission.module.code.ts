import { assertNever } from "@akasha/utils-narrow/assert-never"

export type Permission = "prompt" | "prompt-with-rationale" | "granted" | "denied"

export type RegisterAction = "register" | "request" | "degrade"

export function decidePermissionAction(receive: Permission): RegisterAction {
  switch (receive) {
    case "granted":
      return "register"
    case "prompt":
    case "prompt-with-rationale":
      return "request"
    case "denied":
      return "degrade"
    default:
      return assertNever(receive)
  }
}
