export type SelectOption = { id: string; label: string }

export type SelectOptionCreateResult =
  | { kind: "invalid"; reason: string }
  | { kind: "existing"; option: SelectOption }
  | { kind: "create"; option: SelectOption }

export const MAX_OPTION_LABEL_LENGTH = 100

export function resolveSelectOptionCreate(args: {
  label: string
  existingOptions: readonly SelectOption[]
  maxLabelLength: number
  mintId?: (label: string) => string
}): SelectOptionCreateResult {
  const label = args.label.trim()
  if (label.length === 0) {
    return { kind: "invalid", reason: "Option label cannot be empty." }
  }
  if (label.length > args.maxLabelLength) {
    return {
      kind: "invalid",
      reason: `Option label must be ${args.maxLabelLength} characters or fewer.`,
    }
  }
  const folded = label.toLocaleLowerCase()
  const match = args.existingOptions.find((o) => o.label.trim().toLocaleLowerCase() === folded)
  if (match) {
    return { kind: "existing", option: match }
  }
  const mintId = args.mintId ?? (() => crypto.randomUUID())
  return { kind: "create", option: { id: mintId(label), label } }
}

export type MultiSelectWriteOptionsResult =
  | { kind: "invalid"; reason: string }
  | {
      kind: "resolved"
      readonly optionsToAdd: readonly SelectOption[]
      readonly normalizedValues: readonly string[]
    }

export function resolveMultiSelectWriteOptions(args: {
  values: readonly unknown[]
  existingOptions: readonly SelectOption[]
  maxLabelLength?: number
}): MultiSelectWriteOptionsResult {
  const maxLabelLength = args.maxLabelLength ?? MAX_OPTION_LABEL_LENGTH
  const optionsToAdd: SelectOption[] = []
  const normalizedValues: string[] = []
  const known: SelectOption[] = [...args.existingOptions]

  for (const value of args.values) {
    if (typeof value !== "string") {
      return { kind: "invalid", reason: "Multi-select values must be strings" }
    }
    const decision = resolveSelectOptionCreate({
      label: value,
      existingOptions: known,
      maxLabelLength,
      mintId: (label) => label,
    })
    if (decision.kind === "invalid") {
      return { kind: "invalid", reason: decision.reason }
    }
    normalizedValues.push(decision.option.id)
    if (decision.kind === "create") {
      optionsToAdd.push(decision.option)
      known.push(decision.option)
    }
  }

  return { kind: "resolved", optionsToAdd, normalizedValues }
}
