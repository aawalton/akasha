import type { Question } from "akasha/personas/questions/question.page-type.types.ts"

export const theDomainsPanelNumbersEachRowOffTheOrderAParent = {
  id: "01a095c0-657e-7766-a3bc-bf774ddd3855",
  type: "question",
  slug: "the-domains-panel-numbers-each-row-off-the-order-a-parent",
  ask: "The Domains panel numbers each row off the order a parent writes its parts in. Record, number, or none? The numbering is one line: `code/editor/extension/domain-tree-view/domain-tree-view.module.code.ts:77` renders a row as `position-label` where a position exists and as the bare label where it does not. The position comes from `code/editor/extension/champions-tree/champions-tree.module.code.ts:28`: where the parent names no sequence every child gets none, and otherwise children are numbered one upward in the order the parent's sequence lists them, with any child the sequence omits falling to the end unnumbered. That sequence is the parent's own `parts` array. This is the only reader in the repository that depends on the order a parts list is written in; the command-line drawer sorts before it descends. That is what makes this a question rather than a cleanup. `domains/properties/parts.relation-property.ts:10` declares `sorted: true`, and its `:22` says a parts list is sorted by the whole `type/slug` a part is written as. If parts are sorted, the number the panel prints is a position in an alphabetical list, which carries no meaning of its own. The sorting is being carried out: `:26` is still a gap saying every parts list already written is in that order, and the 334 files that figure was taken from is stale — several landings since have carried the lists into order, `101738e7037` alone carrying sixty more. Two things the working memory offers as reasons no longer hold. `add-property-value` does not simply append any more; it reads whether the property declares itself sorted and inserts in place where it does, and `parts` does declare it. And `change-domain-parent` routes a new part through that act only where the parent already names a parts list; where the parent names none it puts the key in with a one-element list instead. So sorting by hand rotting is no longer the live objection — the write path sorts. What is left is one word about what the panel should show.",
  askedBy: "athena",
  askedIn: "01a09279-d28b-7685-a730-7779118b7cc2",
  status: "open",
  offered: [
    "`record` — `parts` becomes a record whose written entry order is the order the parent means, on the model of `list-members`, `sorted` comes off the property, and the sorting check is abandoned",
    "`number` — each child domain carries a number saying where it sits, on the model of the `position` and `place` and `display-order` properties that already exist, `parts` stays sorted, and the sorting check graduates",
    "`none` — no numbering at all, the position comes out of both editor modules, and the panel shows labels in the order the sorted parts list gives them",
  ],
} as const satisfies Question
