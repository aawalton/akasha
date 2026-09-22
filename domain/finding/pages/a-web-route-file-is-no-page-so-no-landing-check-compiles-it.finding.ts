import type { Finding } from "akasha/domain/finding/finding.page-type.types.ts"

export const aWebRouteFileIsNoPageSoNoLandingCheckCompilesIt = {
  id: "01a0c978-7bdf-76a8-ad4b-2531ff472328",
  type: "page-type/finding",
  slug: "a-web-route-file-is-no-page-so-no-landing-check-compiles-it",
  domain: "domain/check",
  claim:
    "The landing checks compile the program the pages reach, and `alan/web` holds files that are no page: `root.tsx`, `entry.server.tsx`, `routes.ts`, `server.ts`, `vite.config.ts` and every bare file under `routes/`, of which `_app-layout.tsx` is one. Vite builds those files and the checks do not, so taking a module away can leave one of them importing a path that is gone, land with every check green, and refuse every later deploy of the app at the build step. The refusal reaches whoever deploys next rather than whoever landed the removal, and it reaches every app the file belongs to at once.",
  evidence:
    'Commit `93ab71bf4e0` took `alan/web/modules/kokoro-tts-adapter`, `shell-media-src`, `shell-ensure-rendition` and `page/ui/media` away, and it landed: the orphan-module check, the TypeScript compile, the lint and the tests all passed over 119 files. `alan/web/routes/_app-layout.tsx` went on importing `buildNativeTtsAdapter` from the first of those, along with `resolveShellMediaSrc`, `resolveShellHlsSrc`, `resolveShellEnsureRendition` and `PlayingSessionProvider`, and nothing said so. A second agent found it when its own deploy of `alanwalton-web` was refused at the web build, and reported that every deploy of that app was refused meanwhile.\n\nThe file sits inside a project that would have caught it. `alan/web/tsconfig.json` includes `routes/**/*.tsx`, so `tsc -b` in that folder compiles it. The repository\'s root `tsconfig.json` is `{"files": []}` and names no project reference, so a root build reaches nothing and the web project is built by no run the landing makes.\n\nMended at `e70a1e2fd17` by taking the five imports and the wiring they fed away. `bunx vite build` in `alan/web` then built, and it is the only run here that judged the file.',
} as const satisfies Finding
