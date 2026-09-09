import type { Finding } from "../finding.page-type.types.ts"

export const theStoplightTypeNamesHabitWhileTheInboxesFeedSendsInbox = {
  id: "01a0826d-707a-7c4a-a803-99c6bfa00637",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "the-stoplight-type-names-habit-while-the-inboxes-feed-sends-inbox",
  domain: "workspace-package/readout",
  claim:
    "`Stoplight` in `readouts/group-serving/readout-group-serving.module.code.ts` declares `habit?: string`, but the key a stoplight carries is a parameter each caller hands in. The inboxes feed hands in `inbox`, so what reaches the wire is `inbox` while the type names `habit`. Nothing refuses it, because a computed key widens to an index signature the declared type admits.",
  evidence:
    '`wireKeyed(wireKeyName, wireKey)` returns `{ [wireKeyName]: wireKey }` typed as `Pick<Stoplight, "habit">`. TypeScript admits it: an object with a computed key is `{ [x: string]: string }`, which is assignable to `{ habit?: string }`. So the annotation is never tested against the key actually written.\n\nThe callers disagree with the type. `alan/web/routes/inbox-stoplights/inbox-stoplights.route.code.ts` hands in its own `WIRE_KEY_NAME`, and `inbox-stoplights.route.test.ts:109` hands in the literal `"inbox"`. `habit-stoplights`, `safety-level` and `surplus` hand in nothing and take the `habit` default. `alan/web/attribute-stoplights/attribute-stoplights.module.code.ts` hands in a third name of its own.\n\nThe iOS structs record the same split. `InboxStoplight` declares `let inbox: String`; `UpkeepStoplight` and `HabitStoplight` each declare `habit`. All three otherwise carry the same members, and the widget payload mirror\'s dead entries named a `StoplightRing` base each struct extended with a key of its own, which is the shape the wire really has.\n\nThis blocks one entry in `checks/cluster-checks/modules/widget-payload-shape-mirror/widget-payload-shape-mirror.module.code.ts`. `HabitStoplight` and `UpkeepStoplight` are mirrored against `Stoplight` and read correctly. `InboxStoplight` cannot be, because the mirror compares declared names and would report `habit` missing and `inbox` unnamed, and both of those readings would be false.\n\nNothing is broken on the wire today. Each feed sends the key its own widget decodes, and every tile shows what it is sent. What is wrong is that one type claims to describe every feed and describes only three of the four.',
} as const satisfies Finding
