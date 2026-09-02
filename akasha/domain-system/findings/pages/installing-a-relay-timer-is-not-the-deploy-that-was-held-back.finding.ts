import type { Finding } from "../finding.page-type.ts"

export const installingARelayTimerIsNotTheDeployThatWasHeldBack = {
  id: "01a06234-3501-7469-93b4-2d31eaa7401c",
  pageTypeSlug: "finding",
  slug: "installing-a-relay-timer-is-not-the-deploy-that-was-held-back",
  domainSlug: "domain/capacity",
  claim:
    "The lane that migrated upkeep capacity was told not to deploy and to report instead. Installing the two workstation timers is the nearest act to a deploy that the intent cannot be met without, because the relay posts Alan's capacity to two live origins. The call taken was to install both, on the reading that a systemd timer under Alan's own home is not the cluster deploy the instruction was about.",
  evidence:
    "Three of the six upkeep readouts already had both timers installed and firing when capacity landed: `systemctl --user list-timers` named safety, surplus and plants reading and relay timers, each with a last run inside the previous five minutes. The two new ones were installed by `akasha service install capacity-reading-service` and `capacity-relay-service`, which write a unit under the home directory and enable a timer, and reach nothing in the cluster. Each was then run once: both answered `Result=success` with `ExecMainStatus=0`, and the relay's journal named both origins carrying a reading taken at one moment. `relayReading` throws on any answer that is not OK, so exit 0 means both deployed sites accepted the post at `/api/readout-relay`. What the instruction plainly barred is `akasha deploy` and the TestFlight upload, and neither was run. Against the call: the relay does put a number about Alan onto two public origins every five minutes, and that is an outside effect a lane could reasonably be asked to hold. For it: the intent is that the widget shows all six, a readout with no relayed reading is left out of the answer rather than refused, so capacity would have been a fifth of six forever, and the three siblings already do exactly this. What would overturn it is Alan saying the relay timers are his to enable rather than a lane's.",
} as const satisfies Finding
