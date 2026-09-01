import type { Finding } from "../finding.page-type.ts"

export const theRingDeviceSecretInJennysSopsOpensNothingAndNothingNamesIt = {
  id: "01a05bae-093f-71b2-8b01-3379de9a30b8",
  pageTypeSlug: "finding",
  slug: "the-ring-device-secret-in-jennys-sops-opens-nothing-and-nothing-names-it",
  domainSlug: "domain/monarch",
  claim:
    "`ALANWALTON_RING_DEVICE_SECRET` stands in Jenny's sops and in her live cluster Secret, but no file in the repository reads it and the value it carries opens nothing: Alan's pod refuses it with `no device secret stands for the secret presented`. It is why the ring could not be proved open live without minting a device secret, which was refused.",
  evidence:
    "Searched over ts, tsx, swift and md outside node_modules, build and dist: the name occurs in `smilingjenny/web/deploy/secrets.sops.yaml` and nowhere else, so nothing reads it. Presented as `X-Device-Secret` to `https://alanwalton.com/api/categorization` while his pod ran 283599af2e it answered 401, and the pod logged `[device-secret] refusing: no device secret stands for the secret presented`. The ring itself is sound: two device secret pages stand under `akasha/person-system/device-secret/device-secrets` for account `9ba554f7-cb18-48bb-a709-ec935a895ca7`, neither carrying `revokedAt`, and `akasha/person-system/person-access/person-accesses` holds `alan-route-readout-feed` beside `alan-route-all`, so `guardReadout` opens for the secret Alan's phone holds. That is a proof by construction rather than over the wire, because the only secrets that would prove it live are on his devices and minting another was out of bounds. The call taken in his absence: the key was left where it stands rather than removed with `SMILINGJENNY_RELAY_SECRET`, because a secret nothing in the repository reads may still be read off it, and the gain from removing it is smaller than that risk. A question for Alan: whether this is a dead key to delete or a device that wants re-minting.",
} as const satisfies Finding
