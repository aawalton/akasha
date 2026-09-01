import type { Finding } from "../finding.page-type.ts"

export const twoInstallersShareOneUnitFolder = {
  id: "01a05b44-9d6b-7e2f-b3e9-b3eeaa31dfb9",
  pageTypeSlug: "finding",
  slug: "two-installers-share-one-unit-folder",
  domainSlug: "page-type/workstation-service",
  claim:
    "`akasha service install` and the old `ops service install` write their units into the same staging folder, and akasha reads every unit linked out of that folder as its own. So `akasha service install --all` would disable and delete every unit the old system installed, because no akasha page accounts for them. Naming one service is safe; saying `--all` is not, and nothing in the command warns of it.",
  evidence:
    "`service-installing.module.code.ts:20-21` fixes the staging folder at `.local/state/workstation-services` and the link folder at `.config/systemd/user`. `ourInstalled` at `:56-74` calls a unit ours when its link resolves under the staging folder, with no test of which tool wrote it. The old tool writes to the same place: `~/.local/state/workstation-services/monarch-poll.service:1` carries the header `Generated from domains/services/monarch-poll.md by ops service install`, and its link sits in `.config/systemd/user` beside akasha's. `planFor` at `:99-112` builds `remove` as every owned unit no standing page accounts for, and `installing` at `:158-161` runs `systemctl disable --now` and unlinks each. Akasha carries two workstation service pages today, `page-query-service` and the new `monarch-reading-service`; roughly thirty other units stand linked out of that folder from the old system. A dry run naming the new service listed two writes and one enable and no removal, which is why it was carried out that way. The call taken: the service was installed by name and `--all` was not used. A guard belongs on the command before anyone reaches for `--all` on this machine.",
} as const satisfies Finding
