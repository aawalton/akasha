import type { Finding } from "../finding.page-type.ts"

export const theRelayToJennysSiteWasAPullSoItGoesRatherThanMoves = {
  id: "01a05b94-72d3-7b66-adc0-866f685521a5",
  pageTypeSlug: "finding",
  slug: "the-relay-to-jennys-site-was-a-pull-so-it-goes-rather-than-moves",
  domainSlug: "domain/monarch",
  claim:
    "What carried Alan's reading to Jenny's site was not a relay but a pull, and once the workstation took the reading the pull had nothing left to do. It goes rather than moving into akasha. The call taken in Alan's absence: the relay already in akasha carries to both origins, since it takes its destination where it is run.",
  evidence:
    "Two mechanisms stood, in opposite directions. `module/readout-relay` pushes: `relayReading` POSTs to `RELAY_PATH` and the receiver holds the reading in memory. `shared/monarch-categorization-access/src/ring-relay.ts:11-29` pulled: a bare `fetch` with no method, made by Jenny's pod against `https://alanwalton.com/api/categorization` every time her tile drew. They shared only the header `X-Relay-Secret`, under two different secrets — the push carried `READING_RELAY_SECRET`, the pull `SMILINGJENNY_RELAY_SECRET`. The pull contradicted `readout-relay.module.ts:13`, `A reading moves only when the machine that took it sends it`. Three reasons for the call. The relay takes its destination as an argument said where it is run, so reaching a second origin is one more `runs` line rather than a second carrier. The pull made Jenny's tile depend on Alan's pod over the public internet on every render. And the relay only ever needed to carry the reading: the rungs and the none-left words are committed pages, and Jenny's pod already reads the same store Alan's does, so the store carries what can be committed and the relay carries the one thing that cannot. Counted three ways — package name, relative path, and the `~/*` alias — the package had one code importer, Jenny's route. Proved over real HTTP before removal: the relay carrier POSTing into her real receiving route and her real categorization route serving it, 9 tests at `smilingjenny/web/app/routes/api.categorization.test.ts`, and the served body carried `unreviewed`, `scale`, `noneLeftWords` and `noneLeftEmoji` where the wire had carried only `readout`, `value` and `at`.",
} as const satisfies Finding
