import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const serviceWorkstation = {
  id: "01a05a3f-b42a-754e-af3c-8b30ed9d6ad1",
  type: "page-type/page-type",
  slug: "service-workstation",
  definition: "a service the workstation runs",
  pluralSlug: "service-workstations",
  extends: ["page-type/service"],
  parts: [
    "boolean-property/catch-up",
    "boolean-property/enabled",
    "boolean-property/needs-secrets",
    "boolean-property/told",
    "boolean-property/well",
    "instant-property/looked-at",
    "instant-property/worked-at",
    "module-property-group/running",
    "module/binary-running",
    "module/code-moving",
    "module/file-following",
    "module/run-composing",
    "module/run-outcome",
    "module/service-alerting",
    "module/service-asking",
    "module/service-beating",
    "module/service-binding",
    "module/service-checkout",
    "module/service-health",
    "module/service-installing",
    "module/service-loading",
    "module/service-putting-up",
    "module/service-reading",
    "module/service-running",
    "module/service-watching",
    "module/service-wellness",
    "module/tick-deadline",
    "module/tick-ratchet",
    "module/tick-sleeping",
    "module/unit-writing",
    "number-property/accuracy-seconds",
    "number-property/jitter-seconds",
    "number-property/port",
    "number-property/restart-delay-seconds",
    "number-property/restart-force-exit-status",
    "number-property/start-limit-interval-seconds",
    "number-property/start-timeout-seconds",
    "number-property/success-exit-status",
    "number-property/works-within-seconds",
    "record-property/systemd",
    "select-property/restart",
    "text-property/after",
    "text-property/binds",
    "text-property/part-of",
    "text-property/schedule",
    "text-property/stops",
    "text-property/unbound",
    "text-property/wanted-by",
    "text-property/wants",
  ],
  properties: [
    { pageProperty: "boolean-property/enabled", required: true, many: false },
    { pageProperty: "record-property/systemd", required: false, many: false },
    { pageProperty: "boolean-property/needs-secrets", required: false, many: false },
    { pageProperty: "number-property/port", required: false, many: false },
    { pageProperty: "text-property/binds", required: false, many: true, maxCount: null },
    { pageProperty: "number-property/works-within-seconds", required: false, many: false },
    {
      pageProperty: "text-property/unbound",
      required: false,
      many: true,
      maxCount: null,
      uncommitted: true,
    },
    {
      pageProperty: "boolean-property/well",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "instant-property/looked-at",
      required: false,
      many: false,
      uncommitted: true,
    },
    {
      pageProperty: "instant-property/worked-at",
      required: false,
      many: false,
      uncommitted: true,
    },
    { pageProperty: "module-property-group/running", required: false, many: false },
    { pageProperty: "boolean-property/told", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A workstation service runs the code out of the tree its kind's deploy pinned at a commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A running workstation service takes the commit its tree sat at as it started.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A service a deploy would restart has the test beside its page judged before that tree moves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A service that test refuses leaves the tree, and every service running, as they were.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A service that finds the tree moved leaves at a point that service itself calls safe.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service leaves on the one exit systemd is told means start me again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service reaching no safe point goes on running the code it loaded.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A workstation service is killed for code that moved by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A workstation service is started and stopped from its page alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service stopped by hand is running again at the next deploy of its kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Taking a service out of service is landing that it is not enabled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The finding of the last look at a service's health is carried outside the commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A verdict is written only where the verdict changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A verdict has no freshness.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The moment of a look is carried once by the service that does the looking.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A verdict is read as current only where that one moment is recent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A service that is not to be running says so on its page rather than in a verdict.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A service publishes beside its page every host name the service states and could not bind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service publishing a host name the service could not bind is broken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A service whose work lands in rounds publishes beside its page when a round last landed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service says on its page how long the service may go without a round landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service going longer than that without a round landing is broken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A moment saying work landed is evidence of work rather than evidence of a process.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "Every workstation service runs under systemd.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every workstation service's unit is written and enabled by one deploy naming the kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A landing rewrites a unit from the checkout without moving the tree it names.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A unit's path and the tree that unit runs from come from one commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service whose work lands in rounds is asked for a round by whoever needs one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pages a workstation service reads and writes sit in the main checkout rather than that tree.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
