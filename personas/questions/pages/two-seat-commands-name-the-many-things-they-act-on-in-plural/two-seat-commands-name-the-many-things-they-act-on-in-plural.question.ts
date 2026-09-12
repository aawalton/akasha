import type { Question } from "akasha/personas/questions/question.page-type.types.ts"

export const twoSeatCommandsNameTheManyThingsTheyActOnInPlural = {
  id: "01a095cb-f41d-7bc5-a566-ba8e07e29ff1",
  type: "question",
  slug: "two-seat-commands-name-the-many-things-they-act-on-in-plural",
  ask: "`seat compose-notices` and `seat refresh-settings` are the only two names in the command tree whose object word is plural, and each is plural because the command acts on all of them in one run. Should the object go singular? `compose-notices` answers every notice page the index files, keyed by that page's slug, at `commands/pages/seat/compose-notices/seat-compose-notices.command.ts:57`; `notices()` at `commands/pages/seat/compose-notices/seat-compose-notices.command.code.ts:28` hands back one record over the six `.notice.ts` pages the checkout has, and `:49` of the page says nothing there lets a caller ask for one of them. `refresh-settings` writes every live settings file: `liveSettingsPaths()` at `commands/pages/seat/refresh-settings/seat-refresh-settings.command.code.ts:54` gathers one path per running process and `refreshedRows` at `:98` writes each, which the page says at `:8`, `:27`, `:31` and `:52`. The census behind this: over the 237 command names and 58 namespace names at HEAD, the only words ending in `s` are `logs`, `notices`, `press`, `settings`, `sms`, `status`, `takes` and `talos`, with no irregular plural among them. `press` is from `mobile sim long-press-drag`, `sms` and `talos` are names, `status` is singular, `takes` is a present-tense act word on `temper inventory rule takes`, and `logs` became `log` at `1dbaf939a1f` because it reads one file. That leaves these two. They differ in one way. `notice` has a singular and the tree already uses it, at `seat-compose-notices.command.ts:49`, `:57` and `:62`. `settings` has none: the artifact is a settings file and `a setting` is a different thing, so `seat refresh-setting` would name nothing that exists. Every other hyphenated name in the tree takes a singular object, as `temper inventory lookup-item`, `email message modify-label`, `music import-artist` and `temper addon copy-metadata` do. A rename costs the command's own folder and one line of `commands/pages/seat/seat.namespace.ts`.",
  askedBy: "athena",
  askedIn: "01a09264-510d-791b-bed6-6bfd0815b604",
  status: "open",
  offered: [
    "Both go singular, to `seat compose-notice` and `seat refresh-setting`, so no name in the tree is plural and what the file is called on disk is no part of the name",
    "Only `compose-notices` goes singular, to `seat compose-notice`; `settings` has no singular, so `seat refresh-settings` names one artifact rather than a count",
    "`seat compose-notices` drops the act word and takes the answer word, becoming `seat notice list`, since it answers many notices and does nothing else; `seat refresh-settings` writes rather than answers, so it keeps its name",
    "Both keep their names, and the rule narrows to say that a name never counts what a command answers, which neither of these does, because one composes and one writes",
  ],
} as const satisfies Question
