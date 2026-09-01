import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const alanHarness = {
  id: "01a05381-69f8-77f7-afef-d8329db98385",
  pageTypeSlug: "domain",
  slug: "alan-harness",
  definition: "how Alan does things",
  partSlugs: [
    "domain/monarch",
    "workspace-package/readout-system",
    "workspace-package/voice-core",
    "workspace-package/idle-system",
    "workspace-package/sms-access",
    "workspace-package/sms-core",
    "workspace-package/personas-core",
    "workspace-package/email-inbound",
    "workspace-package/ssh-access",
    "workspace-package/google-oauth",
    "workspace-package/drive-google",
    "workspace-package/calendar-google",
    "workspace-package/calendar-sync",
    "workspace-package/email-google",
    "workspace-package/awen-core",
    "workspace-package/alanwalton-web",
    "workspace-package/imessage",
    "workspace-package/tower-core",
    "workspace-package/tower-engine",
    "workspace-package/tower",
    "workspace-package/health-samples-access",
    "workspace-package/health-samples-day",
    "workspace-package/health-samples-import",
    "workspace-package/location-traces-access",
    "workspace-package/chess-core",
    "workspace-package/geo-io",
    "workspace-package/browser-launch-env",
  ],
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Alan changes often.",
    },
    {
      invariantKind: "departure",
      statement: "Alan's harness is optimized for fast change over stability.",
    },
    {
      invariantKind: "departure",
      statement: "Alan's harness has a footprint in several products.",
    },
    {
      invariantKind: "gap",
      statement: "Everything in Alan's harness changes without a deploy.",
    },
    {
      invariantKind: "gap",
      statement: "A deploy to it only adds or removes or replaces what is there to change.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
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
