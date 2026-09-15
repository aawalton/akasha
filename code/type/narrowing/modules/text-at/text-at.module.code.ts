import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"

export function textAt(
  values: Readonly<Record<string, unknown>> | null,
  key: string
): string | null {
  return textIn(values?.[key])
}
