import type { Finding } from "../finding.page-type.ts"

export const aDeviceSecretIsACredentialKeptInTheCommit = {
  id: "01a05b4b-4db6-79f3-ae76-1b3953664d3f",
  pageTypeSlug: "finding",
  slug: "a-device-secret-is-a-credential-kept-in-the-commit",
  domainSlug: "page-type/device-secret",
  claim:
    "A device secret stands as a page, so every mint and every revoke is a commit to this repository and the hash of a live credential stays in its history after the page is deleted. Recording when a secret was last presented would be a commit on every readout request, so it is written nowhere. Nothing here is reached until Alan signs in once: only a session he holds mints the first secret.",
  evidence:
    "The store answers from the index built at HEAD, so a device secret is only found once it is committed. `writePage` and `patchPage` refuse for want of a renderer, so `device-secret-standing` renders the page body itself and lands it with `writeFiles`, and revoking re-renders it with `revokedAt` through `patchFiles` so the commit it read at guards the write.\n\nThree things follow, and none is settled.\n\nDeleting a revoked page does not take its hash out of the history. A sha-256 over 256 bits of a random value narrows nothing, so this is not a leak today, but a page type that carried the secret itself rather than its hash would be one, and the page type says the secret stands nowhere here so that it stays that way.\n\nThe route as it stood patched `last-used-at` on every call and threw when that failed, which refused a caller who had already verified. That patch is gone. Recording it would mean a commit per readout request, which the store cannot carry. Where a last-presented reading belongs is open; it is bookkeeping rather than access, and it belongs wherever readings go rather than on the page.\n\nMinting authenticates through the session `getUser(request)` reads, which only Alan can produce. Until he signs in on his phone once, no device secret stands and the readout route refuses every caller correctly. The route was proved open end to end against a fixture page, which was then taken away.\n\nA page is also written by a running web app rather than by an agent, so the writer it names is `alanwalton web`, and such a write runs no check.",
} as const satisfies Finding
