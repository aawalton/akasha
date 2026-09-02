import type { Finding } from "../finding.page-type.ts"

export const theTemperTasksReadoutHasNoGroupAndNoScale = {
  id: "01a0603e-0c8a-7bf9-8fc0-789bc73dfc2b",
  pageTypeSlug: "finding",
  slug: "the-temper-tasks-readout-has-no-group-and-no-scale",
  domainSlug: "domain/temper",
  claim:
    "The temper tasks reading was drawn in the `inboxes` group against the `daily-inbox` scale, and neither has been recreated in akasha. The akasha readout was landed with no group and no scale, so it is colored by nothing and drawn nowhere. Its earned key, which said the inbox had been cleared that day, has no property on the akasha readout at all.",
  evidence:
    "The old page is `readouts/readout/inboxes-temper-tasks.readout.md`. It states `group-slugs: [inboxes]`, `scale-slug: daily-inbox`, `query-slug: inbox-readings-on-day`, `query-key: inbox-temper-tasks`, `earned-key: inbox-temper-tasks-cleared-today`, `place: 3`, `unit: tasks`, `wire-key: temperTasks`.\n\nakasha holds three readout groups (`categorization`, `safety`, `surplus`) and three readout scales (`backlog-count`, `safety-level`, `surplus-hours`). `inboxes` and `daily-inbox` are not among them. Both belong to Alan's readout system rather than to temper: `readouts/group/inboxes.readout-group.md` names five readings, four of which are not temper's, and `readouts/scale/daily-inbox.readout-scale.md` is the scale every daily inbox is read against. Creating either here would be creating a part of Alan's harness while migrating temper, so neither was created.\n\nThe earned key is a separate loss. `page-type/readout` carries `label`, `unit`, `place`, `figure-format`, `scale-slug`, `group-slugs`, `none-left-words`, `none-left-emoji`, `wire-key`, `last-value` and `last-value-at`. There is no key saying which boolean on the tracking day means the inbox was cleared, so `inbox-temper-tasks-cleared-today` names nothing from the akasha page.\n\nThe reading is also taken by nothing yet. `upkeep-safety` and `monarch-unreviewed-transactions` are each driven by a workstation service running a script under `readouts/`, and no such service was written for this one, because the old reading was never taken by a timer: it was read out of the tracking day by the query system.\n\nThe akasha page is `akasha/temper/temper-progress/readouts/inboxes-temper-tasks/inboxes-temper-tasks.readout.ts`.",
} as const satisfies Finding
