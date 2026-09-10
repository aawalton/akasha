import type { Initiative } from "../initiative.page-type.types.ts"

export const amyHarnessImprovements = {
  id: "01a087b7-34b5-7bf9-bc45-4b2eb623b673",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "amy-harness-improvements",
  domain: "domain/alan-harness",
  persona: "amy",
  intents: [
    {
      statement: "Alan's phone drains its health samples into akasha every day.",
      workingMemory:
        "777 readings landed at 08:16 on 2026-09-10. The cause was never the renames — the headscale TLS certificate expired, tailscaled could not fetch its control key, and `workstation.alanwalton.ts.net` had no address for 23h43m while `page-listening` served loopback and systemd called it healthy. Alan holds that certificate. A refused bind is now published as `unbound` beside the service page and read by `brokenIn`, so the store reads broken in a minute and mends when the name binds.",
    },
  ],
} as const satisfies Initiative
