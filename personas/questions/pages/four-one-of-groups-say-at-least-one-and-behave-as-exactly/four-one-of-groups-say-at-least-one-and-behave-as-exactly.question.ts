import type { Question } from "akasha/personas/questions/question.page-type.types.ts"

export const fourOneOfGroupsSayAtLeastOneAndBehaveAsExactly = {
  id: "01a095c0-657e-7487-94f2-f19cf9f9e377",
  type: "question",
  slug: "four-one-of-groups-say-at-least-one-and-behave-as-exactly",
  ask: "Four `oneOf` groups say at least one and behave as exactly one. Should a mixed group exist? `oneOf` means at least one — `commands/properties/one-of.relation-property.ts:8` — and that is all the reader enforces: `grouped` and `lacking` at `commands/arguments/word-reading/argument-word-reading.module.code.ts:159` refuse only a call that said none of a group. Exactly one comes from elsewhere, `fighting` at `:139`, which reads `not-with` pair by pair. So a group is exactly-one when `not-with` covers every pair in it, and that is readable off the pages without anyone ruling on it. Counting the command pages as they are now: 29 groups across 24 pages, and 22 of them cover every pair. Three of the remaining seven genuinely compose, and should — `email-message-modify-label.command.ts:35` puts additions and removals into one request, `inference-wan-generate.command.ts:21` says that naming both frames interpolates the first to the last, and `alan-tracking.command.ts:76` lands paths and removals in one change set. That leaves four that declare at least one and then do not take more than one. `imessage-send.command.ts:62` groups `text-file`, `text` and `image` but forbids only the `text-file` and `text` pair at `:64`, so one pair of three is covered and two are not. `track-session-drop.command.ts:69` and `track-session-amend.command.ts:94` group `at`, `id`, `open` and `last` and forbid none of the six pairs, yet their only reader, `addressed` at `commands/pages/track/session-rows/session-rows.module.code.ts:263`, is a fixed precedence chain answering one row, so a second address is dropped in silence rather than refused. `music-import-artist.command.ts:69` groups `artist-name` and `mbid`, forbids neither, and its code discards the name when a call says both. The one-of page already carries this as a gap at `:36`: a group where exactly one is said is this beside `not-with` with nothing joining the two, and one group may hold a pair `not-with` forbids and a pair it does not, so no group-wide word fits. Two of the four are mixed a second way as well — in the track groups `open` and `last` carry no value while `at` and `id` carry text, so half the group is a boolean always answered and half is a key a call may leave out.",
  askedBy: "athena",
  askedIn: "01a09263-b049-757c-8bce-377d6682545a",
  status: "open",
  offered: [
    "A group covers every pair or none — the four declare `not-with` for each pair they mean to forbid, after which exactly-one and at-least-one are told apart by reading the pages alone",
    "A mixed group is legal and the code goes on deciding, with each of the four pages saying in prose which of its arguments wins where a call says two",
    "`oneOf` is narrowed to mean at least one and possibly more, the four become `not-with` groups, and the three that compose are the only ones keeping it",
    "The two track groups are the only real fault and are mended alone, a dropped address being a different thing from `imessage send` composing a picture with a body",
  ],
} as const satisfies Question
