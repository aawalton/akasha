import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { peopleStanding } from "@tools/lib/akasha-people"

export interface PersonHandlerTarget {
  readonly persona: string
  readonly slug: string
}

export async function listPersonHandlers(): Promise<readonly PersonHandlerTarget[]> {
  const root = rootFor(resolveRoots(), AKASHA)
  const targets: PersonHandlerTarget[] = []
  for (const person of peopleStanding(root)) {
    if (person.answeredBy === null) {
      console.warn(`[person-handler] ${person.slug} names no persona who answers them`)
      continue
    }
    targets.push({ persona: person.answeredBy, slug: person.slug })
  }
  return targets
}
