import type { DirectiveKind } from "akasha/domain/directive-kind/directive-kind.page-type.types.ts"

export const rule = {
  id: "01a04e1f-cbf6-77de-b4fd-908de465a115",
  type: "directive-kind",
  slug: "rule",
  definition: "an instruction that always applies, leaving only whether it was done",
} as const satisfies DirectiveKind
