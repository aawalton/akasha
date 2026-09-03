export type Chosen = { readonly chosen: string } | { readonly refused: string }

export type ChosenMany = { readonly chosen: readonly string[] } | { readonly refused: string }

export type Numbered = { readonly number: number | undefined } | { readonly refused: string }

const WHOLE_SAID = /^\d+$/

export function optionId(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function optionIds(labels: readonly string[]): readonly string[] {
  return labels.map(optionId)
}

export function chosenIn(named: string, said: string, labels: readonly string[]): Chosen {
  const id = optionId(said)
  const ids = optionIds(labels)
  if (!ids.includes(id)) {
    return {
      refused: `\`${named}\` takes one of ${ids.join(", ")}, and this call says \`${said}\``,
    }
  }
  return { chosen: id }
}

export function chosenManyIn(named: string, said: string, labels: readonly string[]): ChosenMany {
  const held: string[] = []
  for (const raw of said.split(",")) {
    const one = raw.trim()
    if (one === "") continue
    const chosen = chosenIn(named, one, labels)
    if ("refused" in chosen) return chosen
    if (!held.includes(chosen.chosen)) held.push(chosen.chosen)
  }
  return { chosen: held }
}

export function decimalIn(named: string, said: string | undefined): Numbered {
  if (said === undefined) return { number: undefined }
  const held = Number(said)
  if (!Number.isFinite(held)) {
    return { refused: `\`${named}\` takes a finite number, and this call says \`${said}\`` }
  }
  return { number: held }
}

export function countIn(named: string, said: string | undefined): Numbered {
  if (said === undefined) return { number: undefined }
  if (!WHOLE_SAID.test(said)) {
    return {
      refused: `\`${named}\` takes a whole number that is not negative, and this call says \`${said}\``,
    }
  }
  return { number: Number(said) }
}
