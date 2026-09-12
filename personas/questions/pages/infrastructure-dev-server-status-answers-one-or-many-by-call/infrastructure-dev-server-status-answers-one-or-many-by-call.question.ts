import type { Question } from "akasha/personas/questions/question.page-type.types.ts"

export const infrastructureDevServerStatusAnswersOneOrManyByCall = {
  id: "01a095cd-3d6c-76b0-af98-a0fd445c034e",
  type: "question",
  slug: "infrastructure-dev-server-status-answers-one-or-many-by-call",
  ask: "`infrastructure dev-server status` answers one server or every server depending on the call, so neither `list` nor `show` names it. `commands/pages/infrastructure/dev-server/status/infrastructure-dev-server-status.command.ts:18` says a call naming neither a seq nor an app is read rather than refused, `:22` says such a call answers for every server a state file tracks, and `--seq` and `--app` at `:39` and `:40` are both optional. Is `status` already an answer word, or does a `status` command take one? Eight commands carry `status` at the leaf: `inference status`, `infrastructure dev-server status`, `mobile cut status`, `mobile sim status`, `model gateway status`, `temper catalog status`, `temper watcher status` and `mobile testflight-status`. The rule parts them rather than gathering them. `inference status` asks every declared host, at `commands/pages/inference/status/inference-status.command.ts:26`, so it is a `list`. `model gateway status` answers a row per live seat, at `commands/pages/model/gateway/status/model-gateway-status.command.ts:19` and `:23`, so it is a `list`. `temper catalog status` reports each account over every domain the registry has, at `commands/pages/temper/catalog/status/temper-catalog-status.command.ts:22`, so it is a `list`. `mobile sim status` answers the one session there, at `commands/pages/mobile/sim/status/mobile-sim-status.command.ts:7`, but takes nothing at `:38`, so it is not a `show` either, because a `show` is named which one thing to answer. Applying the rule as it is gives `inference status list`, `model gateway status list`, `mobile sim status show`, and no name at all for `infrastructure dev-server status`. Each of those puts a second answer word on a name whose last word already says an answer is coming.",
  askedBy: "athena",
  askedIn: "01a09264-510d-791b-bed6-6bfd0815b604",
  status: "open",
  offered: [
    "`status` is an answer word of its own, and the eight keep their names; the rule is written as reaching only a command whose name says no answer",
    "Every `status` takes the word its number earns, and `infrastructure dev-server status` parts into two commands, one answering one server and one answering every server",
    "`status` goes and the thing it reads takes the word: `inference host list`, `mobile sim session show`, so no name carries both a state word and an answer word",
    "Nothing changes: `list` and `show` say what those two words mean where the tree uses them, and a `status` command is named for what it reads",
  ],
} as const satisfies Question
