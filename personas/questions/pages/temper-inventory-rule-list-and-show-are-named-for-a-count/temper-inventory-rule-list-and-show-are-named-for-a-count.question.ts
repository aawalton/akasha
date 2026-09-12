import type { Question } from "akasha/personas/questions/question.page-type.types.ts"

export const temperInventoryRuleListAndShowAreNamedForACount = {
  id: "01a095e0-1601-738c-af2a-7405c810316c",
  type: "question",
  slug: "temper-inventory-rule-list-and-show-are-named-for-a-count",
  ask: "`temper inventory rule list` and `temper inventory rule show` sit side by side under `commands/pages/temper/inventory/rule/` and differ in nothing but how many each answers. `temper-inventory-rule-list.command.ts:7` names every category rule in the priority order the addon reads them, and takes only `--json` at `:28`. `temper-inventory-rule-show.command.ts:7` gives back one category rule named by its id, takes `argument/category-rule-id` as a required word at `:61`, and refuses a call saying no id at `:21`. The last word of each name is a count and nothing else. Two rules being worked at once disagree over that. One says every name in the command tree is singular and that how many a command answers is no part of its name. The other says a command answering many is `list` and a command answering one is `show`, which puts the count into the name on purpose. Thirty-three of the 237 commands are named that way today, twenty-five `list` and eight `show`, and the tree keeps the split exactly: all twenty-five answer many, and all eight answer one thing the caller names, which `commands/properties/level-name.text-property.ts` now says. The reading that lets both rules hold is that `list` and `show` name an act rather than a count, as `create`, `delete` and `update` do beside them under the same folder, and that the singular rule is about how a thing is spelled rather than about an answer word. No page says that, and the second rule rests on it.",
  askedBy: "athena",
  askedIn: "01a09264-510d-791b-bed6-6bfd0815b604",
  status: "open",
  offered: [
    "`list` and `show` are acts rather than counts, so both rules hold as written, and the singular rule reaches how a thing is spelled rather than the answer word beside it",
    "The singular rule gives way and is rewritten to say only that no name spells a thing in the plural, dropping the clause about how many a command answers",
    "The list-or-show rule gives way: an answer word never names a command, and the twenty-five `list` names go, leaving the thing and the namespace to say what is reached",
    "Both hold along a boundary written down for the first time: an act word may say how many, and a thing word may not",
  ],
} as const satisfies Question
