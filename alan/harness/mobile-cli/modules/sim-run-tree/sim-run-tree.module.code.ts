import {
  type MobileApp,
  shellRepoPath as shellRepoPathOf,
} from "akasha/alan/harness/mobile-cli/modules/mobile-app/mobile-app.module.code.ts"
import { InputError } from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"
import { sharedBuildFiles } from "akasha/code/ios-app/modules/shared-build-files/shared-build-files.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

export function shellRepoPath(app: MobileApp): string {
  if (app.nativeShellRepoPath === null) {
    throw new InputError(
      `${app.slug} states no \`native-shell-repo-path\`, so there is no native shell to deliver to the macbook`
    )
  }
  return shellRepoPathOf(app).path
}

export function simRunSharedRepoPaths(): readonly string[] {
  const shared = sharedBuildFiles(rootFor(resolveRoots(), AKASHA))
  if ("why" in shared) throw new InputError(shared.why)
  return shared.files
}

export function simRunSourceRepoPaths(
  app: MobileApp,
  shared: readonly string[]
): readonly string[] {
  return [shellRepoPath(app), ...shared]
}
