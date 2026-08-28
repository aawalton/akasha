import type { Refusal } from "../document/types.ts"
import { refusalText } from "../../refusal/refusal.ts"

export function partOutsideShape(refusal: Refusal, where: string): string {
  return refusalText("page-part-outside-shape", {
    where,
    part: refusal.part,
    expected: refusal.expected,
    measured: refusal.measured,
  })
}
