import type { Finding } from "../finding.page-type.ts"

export const jennysLivePodStillPullsSoTheRelaySecretBypassCannotGoYet = {
  id: "01a05b94-72d4-7c44-b675-05ca3083aadf",
  pageTypeSlug: "finding",
  slug: "jennys-live-pod-still-pulls-so-the-relay-secret-bypass-cannot-go-yet",
  domainSlug: "domain/monarch",
  claim:
    "`guardRingReadout` admits any caller presenting `SMILINGJENNY_RELAY_SECRET` and skips the device-secret guard entirely. That arm exists only so Jenny's pod could pull. The repository no longer pulls, but her live pod still runs the code that does, so the arm and the secret cannot go until both sites are deployed.",
  evidence:
    "`alanwalton/web/app/readout-credential/lib/readout-credential.server.ts:24-26,32` — `presentsRelaySecret` compares against `process.env.SMILINGJENNY_RELAY_SECRET`, and `guardRingReadout` returns `null` on a match before `guardReadout` is ever reached. So the secret is a second key to Alan's readout feed that names no person and no device. It stands in both sops files, `alanwalton/web/deploy/secrets.sops.yaml:27` and `smilingjenny/web/deploy/secrets.sops.yaml:12`. What the repository now says: Jenny's route serves what the relay holds and makes no outbound call, and `shared/monarch-categorization-access` is gone. What the pods say is different. `https://alanwalton.com/api/live-version` answered `1124e0a38ad0a544b010cfb44dc0ddd395dee85d`, which carries neither `api.readout-relay.ts` nor the relayed route, and `POST https://alanwalton.com/api/readout-relay` answered 405 rather than 401, so the receiving route is absent there. `POST https://smilingjenny.me/api/readout-relay` answered 404 for the same reason. Three things are left, in order: deploy Alan's web, deploy Jenny's web, then take the arm and the secret away and prove Alan's ring still opens for a device secret and refuses without one. Jenny's pod also needs `READING_RELAY_SECRET` in its sops at the same value the workstation holds, which is the one thing the relay cannot carry for itself.",
} as const satisfies Finding
