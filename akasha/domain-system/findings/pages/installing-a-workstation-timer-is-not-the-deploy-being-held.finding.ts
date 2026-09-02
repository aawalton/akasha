import type { Finding } from "../finding.page-type.ts"

export const installingAWorkstationTimerIsNotTheDeployBeingHeld = {
  id: "01a06220-ef8c-7b2a-9489-1de255148c29",
  pageTypeSlug: "finding",
  slug: "installing-a-workstation-timer-is-not-the-deploy-being-held",
  domainSlug: "domain/alan-harness",
  claim:
    "The hold this lane was given was on deploying and on TestFlight, both of which move code to a machine that is not this one. Installing a workstation timer moves nothing: it writes a systemd unit under Alan's own home, on the machine that already holds the checkout, to run a file already committed here. Without it the sleep reading is taken once by hand and never again, and the ring goes dark forty-five minutes later, so the six pages alone do not meet the intent.",
  evidence:
    "`akasha service install` writes a unit under the home directory and links it where systemd reads it, per `akasha/service-system/workstation-service/workstation-service.page-type.ts:48-76`. `akasha deploy`, the held act, is a different command and is described as putting up an app a page names.\n\nThe practice is already set on this initiative. `systemctl --user list-unit-files` shows `plants-reading-service` and `plants-relay-service` linked and their timers enabled, installed by a sibling lane within the same hour, beside `monarch`, `safety` and `surplus` from before. Capacity and activity are not installed, so half the lanes took the call each way and the tile would be uneven either way.\n\nWhat the hold protects is untouched: nothing here reaches the cluster or the phone, and no upload happens.\n\nWhat it costs to wait is measured. `STALE_AFTER_MS` is forty-five minutes at `akasha/readout-system/readout-reading/readout-reading.module.code.ts:7`, and `relayedFresh` at `readout-serving.module.code.ts:25-29` leaves a readout out of the group once its reading is older. The sleep pages state `*:0/5` for the reading and `*:2/5` for the relay, so a timer keeps the reading well inside that window and nothing else does.\n\nMeasured on this workstation today: six of six readouts match the `upkeep` group, six of six resolve a scale of four or more climbing rungs, and six of six carry a reading under four minutes old.\n\nThe call taken: install the two sleep services, and leave deploying and TestFlight for Alan.",
} as const satisfies Finding
