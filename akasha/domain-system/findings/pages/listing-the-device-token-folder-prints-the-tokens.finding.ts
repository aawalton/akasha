import type { Finding } from "../finding.page-type.ts"

export const listingTheDeviceTokenFolderPrintsTheTokens = {
  id: "01a060fd-684f-7d60-8177-79b62805dc4d",
  pageTypeSlug: "finding",
  slug: "listing-the-device-token-folder-prints-the-tokens",
  domainSlug: "domain/alan-harness",
  claim:
    "Each file under `pages/device-token/` is named for the APNs token it holds, so a bare `ls` of that folder prints the token values themselves. An agent swept there on 2026-09-02 and printed them into its own output before recognising the format. The same shape holds at `pages/location/`, where the filenames are place names. A folder whose filenames are the secret is read by naming a file, never by listing the folder.",
  evidence:
    "The brief that agent worked from named `pages/location/` as the folder whose filenames leak and did not name `pages/device-token/`. That gap was the whole cause: the agent had been told never to print a token value, and obeyed that, then printed the values by listing a directory. A rule stated about one folder read as a rule about that folder alone.\n\nThe values reached the agent's transcript on disk. They reached no commit, no page and no report; the agent was asked to confirm that by name only.\n\nWhat makes this worth filing rather than fixing quietly is that the safe act and the leaking act do not look different. `ls` of a folder of pages is the ordinary way to count what is there, and it is what an agent reaches for first. Every other secret here is guarded by its content: a sops file may be listed freely and refuses to be read. These two folders invert that, and nothing in the folder says so.\n\nThe markdown pages were left in place, correctly. The record at the-health-arrival-lookup-was-dropped-rather-than-kept-for-alan states that the old pages and page types stay, with only `error` treated otherwise, and it enumerates no page types, so the ruling reaches these. Parity was established without printing anything: 3 markdown pages, 3 akasha pages, all three matched by name.\n\nA token cannot be rotated from here. It changes when the app registers again on the phone, and nothing may be pushed to Alan's phone.",
} as const satisfies Finding
