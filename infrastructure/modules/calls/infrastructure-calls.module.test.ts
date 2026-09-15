import { expect, test } from "bun:test"
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
import {
  ADDON_INSTALL,
  DEPLOY,
  SECRET_SET,
  SECRET_SHOW,
  SERVICE_SWEEP,
} from "akasha/infrastructure/modules/calls/infrastructure-calls.module.code.ts"

const EVERY: readonly (readonly [string, readonly { readonly name: string }[]])[] = [
  [ADDON_INSTALL, [temper, temperCommunity, temperCommunityAddonInstall]],
  [DEPLOY, [deploy]],
  [SECRET_SET, [page, pageSecret, pageSecretSet]],
  [SECRET_SHOW, [page, pageSecret, pageSecretShow]],
  [SERVICE_SWEEP, [infrastructure, infrastructureService, infrastructureServiceSweep]],
]

test("a call is the levels' own names with a space between each", () => {
  for (const [said, levels] of EVERY) {
    expect(said).toBe(levels.map((one) => one.name).join(" "))
  }
})

test("a call has one word for each level it reaches", () => {
  for (const [said, levels] of EVERY) {
    expect(said.split(" ")).toHaveLength(levels.length)
  }
})

test("a command under no namespace is reached by its own name alone", () => {
  expect(DEPLOY).toBe(deploy.name)
  expect(DEPLOY).not.toContain(" ")
})

test("a level whose own name carries a hyphen keeps that hyphen", () => {
  expect(ADDON_INSTALL.split(" ")[2]).toBe(temperCommunityAddonInstall.name)
  expect(temperCommunityAddonInstall.name).toContain("-")
})
