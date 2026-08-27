import { InputError } from "@shared/errors-core/exit"
import { slugifyOptionId } from "../../free-exercise-db/map"

function optionIds(optionLabels: readonly string[]): readonly string[] {
  return optionLabels.map(slugifyOptionId)
}

export function normalizeSelectValue(
  input: string,
  optionLabels: readonly string[],
  fieldLabel: string
): string {
  const id = slugifyOptionId(input)
  const ids = optionIds(optionLabels)
  if (!ids.includes(id)) {
    throw new InputError(
      `${fieldLabel}: invalid value "${input}" (expected one of: ${ids.join(", ")})`
    )
  }
  return id
}

export function normalizeMultiSelect(
  csv: string,
  optionLabels: readonly string[],
  fieldLabel: string
): readonly string[] {
  const out: string[] = []
  for (const raw of csv.split(",")) {
    const trimmed = raw.trim()
    if (trimmed === "") continue
    const id = normalizeSelectValue(trimmed, optionLabels, fieldLabel)
    if (!out.includes(id)) out.push(id)
  }
  return out
}
