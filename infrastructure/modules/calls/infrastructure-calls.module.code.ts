import {
  type Named,
  namingOver,
  pathOf,
} from "akasha/command/modules/walking/command-walking.module.code.ts"
import { deploy } from "akasha/command/pages/deploy/deploy.command.ts"
import { infrastructure } from "akasha/command/pages/infrastructure/infrastructure.namespace.ts"
import { infrastructureService } from "akasha/command/pages/infrastructure/service/infrastructure-service.namespace.ts"
import { infrastructureServiceSweep } from "akasha/command/pages/infrastructure/service/sweep/infrastructure-service-sweep.command.ts"
import { page } from "akasha/command/pages/page/page.namespace.ts"
import { pageSecret } from "akasha/command/pages/page/secret/page-secret.namespace.ts"
import { pageSecretSet } from "akasha/command/pages/page/secret/set/page-secret-set.command.ts"
import { pageSecretShow } from "akasha/command/pages/page/secret/show/page-secret-show.command.ts"
import { temperCommunityAddonInstall } from "akasha/command/pages/temper/community/addon-install/temper-community-addon-install.command.ts"
import { temperCommunity } from "akasha/command/pages/temper/community/temper-community.namespace.ts"
import { temper } from "akasha/command/pages/temper/temper.namespace.ts"

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
