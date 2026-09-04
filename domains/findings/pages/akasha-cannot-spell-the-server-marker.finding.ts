import type { Finding } from "../finding.page-type.ts"

export const akashaCannotSpellTheServerMarker = {
  id: "01a063d6-69ce-7000-aea8-93218c31b356",
  pageTypeSlug: "finding",
  slug: "akasha-cannot-spell-the-server-marker",
  domainSlug: "domain/naming",
  claim:
    "akasha's naming grammar cannot spell the `.server` marker, so carrying Alan's device-secret, push and idle modules into akasha would quietly remove the build-time guard that keeps them out of the browser bundle.",
  evidence:
    "`@react-router/dev` compiles `/\\.server(\\.[cm]?[jt]sx?)?$/` at `node_modules/@react-router/dev/dist/vite.js:4233` and refuses at build time when a client module imports a file whose name matches. Seventeen files under `alanwalton/web/app` carry the marker: 6 in `lib`, 4 in `idle/lib`, 2 in `routes`, one each in `device-secret/lib`, `person-access/lib`, `push/lib` and `readout-credential/lib`, and `entry.server.tsx`. Fifteen of them are in the interior. An akasha module is named for its slug and its kind, and the grammar admits no second marker, so a file carried across loses the suffix and with it the refusal. This is why the four client-safe modules moved at `e11669e66a` and `dc0ebc8f50` were chosen: they carry no marker. That move took the interior from 128 files to 124 and the `~/` reaches out of `app/routes` from 71 to 60. The request-credential family would empty two of the seven directories the routes reach into, and every one of its files carries the marker. The `idle` group was measured as a clean leaf of 47 files with no outward reach and read as the natural next landing; counted again on 2026-09-02 it holds 4 marked files, so it is not exempt either. What akasha would need is a way to say that a module is never sent to a browser, checked where the bundle is built rather than inferred from a file name.",
} as const satisfies Finding
