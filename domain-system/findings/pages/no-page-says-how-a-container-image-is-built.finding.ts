import type { Finding } from "../finding.page-type.ts"

export const noPageSaysHowAContainerImageIsBuilt = {
  id: "01a0603e-0c89-7d05-bd81-73dfba0e7c1c",
  pageTypeSlug: "finding",
  slug: "no-page-says-how-a-container-image-is-built",
  domainSlug: "workspace-package/service-system",
  claim:
    "A cluster service names the image its pods run, and nothing in akasha says how that image is built. The temper watcher's build is a Dockerfile with three stages that cross-compiles a Rust tray and a Bun worker for Windows and copies both executables out. No akasha page type carries a container build, so the Dockerfile has nowhere to go.",
  evidence:
    "`akasha/service-system/cluster-service/properties/image.text-property.ts` defines the image as `the container image a workload's pods run` and says it is `named as the cluster's own registry hands the image out`. That is the only mention of an image anywhere in the service system. `manifest-code` names a file outside akasha that emits the workload's manifests, and carries a stopgap saying so, but there is no matching property for a build.\n\nThe file left outside is `infra/k8s/src/temper-watcher/build/Dockerfile`. It has three stages. The first is `rust:1.95-alpine3.23`, adds `mingw-w64-gcc` and the `x86_64-pc-windows-gnu` target, copies `temper-watcher/tray/{Cargo.toml,build.rs,src,assets}`, writes a `.cargo/config.toml` naming the mingw linker and archiver, and builds the tray release. The second is `oven/bun:1.3.14-alpine`, installs the workspace frozen, and runs `bun build --compile --target=bun-windows-x64` over `temper/scripts/src/watcher-exe/main.ts` with three defines: the commit sha as `__WATCHER_VERSION__`, the Supabase URL, and the anon key. The third is `alpine:3.22` and holds only the two executables and a `version.txt`.\n\nWhat that build produces is not a workload the cluster runs. It is a pair of Windows executables Alan installs on the machine the game is on. So even a container-build page type would be the wrong shape unless it could say that what comes out is an artifact rather than an image to deploy.\n\nThe Dockerfile was left where it is. Nothing was invented for it.",
} as const satisfies Finding
