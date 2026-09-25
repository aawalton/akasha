import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"

type Permission = "prompt" | "prompt-with-rationale" | "granted" | "denied"

type RegisterAction = "register" | "request" | "degrade"

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
