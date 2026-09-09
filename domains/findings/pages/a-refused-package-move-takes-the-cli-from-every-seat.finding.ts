import type { Finding } from "../finding.page-type.types.ts"

export const aRefusedPackageMoveTakesTheCliFromEverySeat = {
  id: "01a0735b-f44b-7046-bd29-811b663c568a",
  pageTypeSlug: "finding",
  slug: "a-refused-package-move-takes-the-cli-from-every-seat",
  domain: "domain/akasha",
  claim:
    "A move of a package folder relinks that package under `node_modules` before the checks judge the move, so a move that is then refused leaves the link naming a folder that never came to exist, and every `akasha` call in the checkout fails until the link is put back.",
  evidence:
    "At 13:50 `node_modules/@akasha/command-system` named `../../command-system`. At 13:52 it named `../../commands`, a folder holding nothing, tracked by nothing, and carrying no `package.json`. Every `akasha` call refused through that window, 6 of 6 probes, with `Cannot find module '@akasha/command-system/during-call'`, and once `fault-saying` instead, both raised from a file importing the package by name alone. `command-system/` was untouched throughout, holding 414 tracked files, with both exports present in its manifest and both target folders on disk. No commit between 12:00 and 13:56 renames `command-system` to `commands`, so the move drafting that rename never landed. At 13:53 the link named `../../command-system` again and the calls answered. `akasha move --help` states the order this follows from: `a package folder that moves is reached again where it arrives, before anything is judged`. My own `ln` to correct it was refused by `block-akasha-shell-writes`, and `akasha restore` could not have run, because the CLI it is part of was the thing that was down. I did not establish which agent drafted the move, nor whether the link was put back by a command or by hand.",
} as const satisfies Finding
