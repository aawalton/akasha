import type { Question } from "akasha/personas/questions/question.page-type.types.ts"

export const thePathArgumentKindNamesTwoPoliciesNotOneShouldIt = {
  id: "01a095b1-9843-7764-bd99-d39a907d385b",
  type: "question",
  slug: "the-path-argument-kind-names-two-policies-not-one-should-it",
  ask: "The `path` argument kind names two policies, not one. Should it split in two? Fifty argument pages carry the `path` value. `--file-path` must name a file inside the repository — `commands/arguments/pages/file-path.argument.ts:9` — and `alan tracking` reads it with `pathAt`, which answers nothing for a path outside. `--output` must name a file outside it — `commands/arguments/pages/output.argument.ts:9` — because a render is written to `~/`, and it is read with `pathUnder`, which expands `~/` and allows any absolute path. `commands/modules/said-pathing/said-pathing.module.ts` already states those two readers and their opposite policies as invariants. Nothing resolves either one today: `heldOf` at `commands/arguments/word-reading/argument-word-reading.module.code.ts:82` hands back the raw string for `path`, so `path` is `text` with another word on it, and each command resolves for itself. Two departures say that is wrong — `commands/command.page-type.ts:141` and `commands/arguments/properties/argument-value.select-property.ts:17`, both reading that a path is read against the repository root rather than the calling folder. Neither can become true while one kind covers both policies: resolving every `path` with `pathAt` makes every inference render refuse, and resolving with `pathUnder` stops `alan tracking` refusing the strays it exists to catch. They are not unimplemented rules; they are one rule written as if one word named one policy.",
  askedBy: "athena",
  askedIn: "01a09263-b049-757c-8bce-377d6682545a",
  status: "open",
  offered: [
    "Split the kind — one for a path inside the repository, one for a path that may leave it — and let each departure be true of its own kind",
    "Keep one kind and make both departures true of it, accepting that a render can no longer be written outside the repository",
    "Keep one kind and delete both departures, leaving each command to resolve its own paths as they do today",
  ],
} as const satisfies Question
