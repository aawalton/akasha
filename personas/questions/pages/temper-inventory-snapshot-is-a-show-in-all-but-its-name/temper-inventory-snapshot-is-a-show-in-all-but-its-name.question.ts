import type { Question } from "akasha/personas/questions/question.page-type.types.ts"

export const temperInventorySnapshotIsAShowInAllButItsName = {
  id: "01a095cc-a22a-7553-8c15-d77cc9397308",
  type: "question",
  slug: "temper-inventory-snapshot-is-a-show-in-all-but-its-name",
  ask: "`temper inventory snapshot` is a `show` in all but its name. It takes `argument/snapshot` as a word at `commands/pages/temper/inventory/snapshot/temper-inventory-snapshot.command.ts:56`, is reached by page id or by slug at `:21`, and refuses a call naming no snapshot at `:49`. That is the shape all eight commands named `show` have. Should it and the commands like it take the answer word? The pair that shows the cost of leaving them: `temper inventory bank trace` gives back the one timing trace from the addon's last banking session, at `commands/pages/temper/inventory/bank/trace/temper-inventory-bank-trace.command.ts:7`, and `:12` says the trace read is the most recent trace. `temper inventory master craft-trace` gives back a ring of traces, at `commands/pages/temper/inventory/master/craft-trace/temper-inventory-master-craft-trace.command.ts:7`, and `:12` says the ring has a bounded count of traces. Both are named `trace`, one answers one and one answers many, and neither name says which. The two words are exact where the tree uses them. Twenty-five commands are named `list` or `<thing>-list` and all twenty-five answer many; eight are named `show` and all eight answer exactly one thing the caller names, seven by a required argument and `change show` by the required key `at`, at `commands/pages/change/show/change-show.command.ts:34` and `:46`. That is now a departure on `commands/properties/level-name.text-property.ts`. What no page settles is whether a command saying neither word has to take one. Where the thing has a level of its own the word sits alone, as in `temper inventory rule show`. Where it does not, the tree glues the word on: twelve names end `-list` and none ends `-show`, so `temper inventory bank trace` would be the tree's first `trace-show`, or would gain a level under `bank` holding one command.",
  askedBy: "athena",
  askedIn: "01a09264-510d-791b-bed6-6bfd0815b604",
  status: "open",
  offered: [
    "Every act-less command answering a held artifact takes the word, and takes a level where it needs one: `temper inventory snapshot show`, `temper inventory bank trace show`, `temper inventory master craft-trace list`",
    "Every such command takes the word glued on as `-list` already is, so no level appears to hold one command: `snapshot-show`, `trace-show`, `craft-trace-list`",
    "Only a command already named which one thing to answer takes the word, so `temper inventory snapshot` becomes a `show` and the rest keep their names",
    "Nothing changes: a name reaching one thing is enough, and `list` and `show` say what those two words mean rather than what every answering command must be called",
  ],
} as const satisfies Question
