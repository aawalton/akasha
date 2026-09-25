import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const alanHarness = {
  id: "01a05381-69f8-77f7-afef-d8329db98385",
  type: "page-type/domain",
  slug: "alan-harness",
  definition: "how Alan does things",
  parts: [
    "domain/alan-harness-agent",
    "domain/alan-harness-stoplight",
    "domain/alan-readout",
    "domain/alanwalton-ios-notification",
    "domain/alan-harness-attribute",
    "domain/capacity",
    "domain/code-editor",
    "domain/cost",
    "domain/day-boundary",
    "domain/email-inbound",
    "domain/email-routing",
    "domain/email-watch",
    "domain/errors-client",

    "domain/geo-io",
    "domain/health-sample",
    "domain/imessage",
    "domain/inbox",
    "domain/location-trace-access",
    "domain/mobile-cli",
    "domain/monarch",
    "domain/notification",
    "domain/money",
    "domain/plant",
    "domain/recurrence",
    "domain/reminder-system",
    "domain/rules-engine",
    "domain/safety",
    "domain/sleep",
    "domain/sms-core",
    "domain/ssh-access",
    "domain/supabase-auth",
    "domain/surplus",
    "domain/web-build-version",
    "domain/web-page-answer",
    "domain/web-static-asset",
    "module/album-pulling",
    "module/answer-error-report",
    "module/overdue-rolling",
    "module/persona-points-rebuilding",
    "module/security-headers",
    "page-type/notification-feed",
    "page-type/readout",
    "service-workstation/overdue-rolling",
    "service-workstation/persona-points-rebuilding",
    "domain/better-auth-rr",
    "domain/handover-rr",
    "module/reading-in-flight",
    "module/router-app-serving",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Alan changes often.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan's harness is optimized for fast change over stability.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan's harness has a footprint in several products.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "Every package Alan's harness is made of is in akasha.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan's upkeep widget shows all four stoplights.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Health samples are imported by `akasha track health-import`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan's inboxes widget shows all five stoplights.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan and Jenny share one widget for Alan's multiplier.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Alan's code editor status line shows workstation load, Claude usage and three stoplight sections.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The code editor draws luck in the attributes section, and no widget does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing reads a readout through the markdown engine.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading is taken on Alan's workstation rather than by a pod serving a route.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A tile shows its last reading rather than going dark when the taker dies.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan's app fills his password in from 1Password.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement:
        "The code editor panel named Page Types is a tree of page types by what each extends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The code editor panel named Services is a tree of services by the kind each one is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The code editor panel named Findings is a tree of findings by the domain each one names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The code editor panel named Gaps is a tree of gaps by the page stating each one.",
    },
  ],
  directives: [
    {
      directiveKind: "directive-kind/rule",
      name: "His Call",
      act: "Enforce the limits Alan set; never veto a choice he made inside them.",
      warrant:
        "Both refuse him something for his own good, so the veto reads as care while you make it.",
      aids: [
        "Never enforce a limit he did not state.",
        "Saying he is past a limit is not stopping him.",
      ],
    },
  ],
} as const satisfies Domain
