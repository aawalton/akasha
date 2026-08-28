import { scalarRule } from "./stated.ts"
import type { Rule } from "./stated.ts"

const HOLE = /\{([^{}]*)\}/g

const BRACE = /[{}]/

/**
 * Fixed words with named holes among them, which is the whole of what `template` declares.
 *
 * WHAT A HOLE MAY NAME IS EACH PROPERTY'S QUESTION RATHER THAN THE TYPE'S. The type states only
 * that a hole is marked `{name}`. Each property typed against it then says what a name may be, and
 * they differ: `named-for` states that every hole names a key the page carries, while `unique-key`
 * defaults to `{page-type.slug}/{slug}`, whose holes name a path across pages rather than one key.
 * A spelling settled here would refuse the second in order to describe the first. And whether a
 * hole reaches anything is a question about the corpus, which a rule handed the value alone cannot
 * answer, as `relation-name` says of a name. So this bounds the carrier: one scalar value, at
 * least one hole in it, and every brace paired with another.
 *
 * A TEMPLATE CARRYING NO HOLE IS FIXED WORDS, AND FIXED WORDS ARE NOT A TEMPLATE. A `named-for`
 * with no hole fills to one constant stem for every page of its type, so the second page written
 * under it is refused for a name already taken, with nothing at that refusal naming the rule.
 */
export const templateRule: Rule = scalarRule(
  "fixed words with at least one `{name}` hole among them",
  (text) => {
    let holes = 0
    for (const [, name] of text.matchAll(HOLE)) {
      if (name === undefined || name.trim() === "") return false
      holes++
    }
    return holes > 0 && !BRACE.test(text.replace(HOLE, ""))
  }
)
