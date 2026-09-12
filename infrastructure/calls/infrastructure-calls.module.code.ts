import {
  type Named,
  namingOver,
  pathOf,
} from "akasha/commands/modules/walking/command-walking.module.code.ts"
import { deploy } from "akasha/commands/pages/deploy/deploy.command.ts"
import { infrastructure } from "akasha/commands/pages/infrastructure/infrastructure.namespace.ts"
import { infrastructureService } from "akasha/commands/pages/infrastructure/service/infrastructure-service.namespace.ts"
import { infrastructureServiceSweep } from "akasha/commands/pages/infrastructure/service/sweep/infrastructure-service-sweep.command.ts"
import { page } from "akasha/commands/pages/page/page.namespace.ts"
import { pageSecret } from "akasha/commands/pages/page/secret/page-secret.namespace.ts"
import { pageSecretSet } from "akasha/commands/pages/page/secret/set/page-secret-set.command.ts"
import { pageSecretShow } from "akasha/commands/pages/page/secret/show/page-secret-show.command.ts"
import { temperCommunityAddonInstall } from "akasha/commands/pages/temper/community/addon-install/temper-community-addon-install.command.ts"
import { temperCommunity } from "akasha/commands/pages/temper/community/temper-community.namespace.ts"
import { temper } from "akasha/commands/pages/temper/temper.namespace.ts"

const LEVELS: readonly Named[] = [
  deploy,
  infrastructure,
  infrastructureService,
  infrastructureServiceSweep,
  page,
  pageSecret,
  pageSecretSet,
  pageSecretShow,
  temper,
  temperCommunity,
  temperCommunityAddonInstall,
]

const NAMED = namingOver(LEVELS)

function calling(one: Named): string {
  return pathOf(one.slug, NAMED)
}

export const ADDON_INSTALL = calling(temperCommunityAddonInstall)

export const DEPLOY = calling(deploy)

export const SECRET_SET = calling(pageSecretSet)
export const SECRET_SHOW = calling(pageSecretShow)

export const SERVICE_SWEEP = calling(infrastructureServiceSweep)
