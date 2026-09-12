import { afterAll, expect, test } from "bun:test"
import { commitAt } from "akasha/commands/pages/deploy/commit-naming/deploy-commit-naming.module.code.ts"
import { recordedCommit } from "akasha/commands/pages/deploy/commit-recording/deploy-commit-recording.module.code.ts"
import type { PuttingUp } from "akasha/commands/pages/deploy/deploy.command.code.ts"
import {
  deploy,
  refNamed,
  stoppedPartWay,
} from "akasha/commands/pages/deploy/deploy.command.code.ts"
import { committed, given } from "akasha/commands/pages/deploy/deploy.command.test-fixtures.ts"
import {
  seededWorld,
  WEB_APPS_AT,
} from "akasha/infrastructure/services/clusters/web-app-reading/web-app-reading.module.test-fixtures.ts"

const WORLD = seededWorld()

afterAll(() => {
  WORLD.sweep()
})

const HERE = given(committed(WORLD.root))

function pastTheChecks(): { readonly root: string; readonly commit: string } {
  const world = seededWorld()
  const root = committed(world.root)
  const commit = commitAt(root, null) as string
  recordedCommit(root, "one-web", `${WEB_APPS_AT}/one-web.web-app.ts`, commit)
  return { root, commit }
}

test("a call naming no app is refused as the caller's fault", async () => {
  const answer = await deploy([], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("name the app")
})

test("a call naming two apps is refused rather than chosen between", async () => {
  const answer = await deploy(["one-web", "two-web"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("one app")
  expect(answer.refusals[0]).toContain("one-web, two-web")
})

test("a flag this command does not take is refused by name", async () => {
  const answer = await deploy(["one-web", "--again"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`--again`")
})

test("a deploy told to be measured is taken rather than refused as a flag it does not take", async () => {
  const answer = await deploy(["no-such-app-here", "--measured"], HERE)

  expect(answer.code).toBe(2)
})

test("a slug no app page of either kind carries is refused as the data's fault", async () => {
  const answer = await deploy(["no-such-app-here"], HERE)
  expect(answer.code).toBe(2)
  expect(answer.refusals[0]).toContain("no-such-app-here")
  expect(answer.refusals[0]).toContain("web app")
  expect(answer.refusals[0]).toContain("ios app")
})

test("a checkout whose checks will not load puts nothing up", async () => {
  const answer = await deploy(["two-web"], HERE)
  expect(answer.code).toBe(2)
  expect(answer.refusals[0]).toContain("the checks would not load")
  expect(answer.refusals[0]).toContain("two-web")
})

test("a refusal reaching no cluster reports nothing", async () => {
  const answer = await deploy(["no-such-app-here"], HERE)
  expect(answer.report).toEqual([])
})

test("an ios app is handed to the build rather than refused as unbuilt", async () => {
  const answer = await deploy(["atlas", "--dry-run"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("names an ios app")
  expect(answer.refusals[0]).toContain("--no-upload")
})

test("an ios app is found by the short slug its page states", async () => {
  const answer = await deploy(["atlas-ios", "--dry-run"], HERE)
  expect(answer.code).toBe(2)
  expect(answer.refusals[0]).toContain("atlas-ios")
})

test("a web app is refused the flag belonging to an ios app", async () => {
  const answer = await deploy(["one-web", "--no-upload"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("names a web app")
  expect(answer.refusals[0]).toContain("--dry-run")
})

test("a web app takes a commit rather than being refused one", async () => {
  const answer = await deploy(["one-web", "--ref", "4f2a91c"], HERE)
  expect(answer.refusals[0]).not.toContain("says nothing about it")
})

test("a commit no checkout holds is refused by the name the call gave", async () => {
  const answer = await deploy(["one-web", "--ref", "4f2a91c"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("4f2a91c")
})

test("every ios app the mobile commands carry is reached by this command", async () => {
  for (const slug of ["alanwalton", "atlas", "smilingjenny"]) {
    const answer = await deploy([slug, "--dry-run"], HERE)
    expect(answer.refusals[0]).toContain("names an ios app")
  }
})

test("a commit named is taken off the call rather than read as a second app", () => {
  expect(refNamed(["atlas", "--ref", "4f2a91c", "--no-upload"])).toEqual({
    ref: "4f2a91c",
    rest: ["atlas", "--no-upload"],
  })
})

test("a commit named with an equals sign is the same as one named after a space", () => {
  expect(refNamed(["atlas", "--ref=origin/change-19458"])).toEqual({
    ref: "origin/change-19458",
    rest: ["atlas"],
  })
})

test("a call naming no commit answers no commit rather than a fixed one", () => {
  expect(refNamed(["atlas", "--no-upload"])).toEqual({ ref: null, rest: ["atlas", "--no-upload"] })
})

test("a commit flag with nothing after it is refused rather than read as a flag", () => {
  expect(refNamed(["atlas", "--ref"])).toEqual({
    refused: "`--ref` takes the commit to build, and this call names none after it",
  })
  expect(refNamed(["atlas", "--ref", "--no-upload"])).toHaveProperty("refused")
  expect(refNamed(["atlas", "--ref="])).toHaveProperty("refused")
})

test("a commit named twice is refused rather than chosen between", () => {
  const answer = refNamed(["atlas", "--ref", "one", "--ref", "two"])
  expect(answer).toHaveProperty("refused")
  expect((answer as { refused: string }).refused).toContain("one")
  expect((answer as { refused: string }).refused).toContain("two")
})

const IMAGE = "the image one/web:abc, built and pushed to the registry"

test("a deploy that threw part way names in its refusal what it had put up", async () => {
  const world = pastTheChecks()
  const putting: PuttingUp = (_read, _slug, _commit, _rest, _given, _restarting, up) => {
    up.push(IMAGE)
    up.push(`${world.commit}, pushed to origin main`)
    throw new Error("kubectl apply was killed")
  }
  const answer = await deploy(["one-web"], given(world.root), putting)
  expect(answer.code).toBe(3)
  expect(answer.refusals[0]).toContain("kubectl apply was killed")
  expect(answer.refusals[1]).toContain(IMAGE)
  expect(answer.refusals[1]).toContain(`${world.commit}, pushed to origin main`)
  expect(answer.report).toContain(`up\t${IMAGE}`)
})

test("a deploy that threw before anything reached a machine says that rather than saying it may be partial", async () => {
  const world = pastTheChecks()
  const putting: PuttingUp = () => {
    throw new Error("the pinned tree would not open")
  }
  const answer = await deploy(["one-web"], given(world.root), putting)
  expect(answer.code).toBe(3)
  expect(answer.refusals[1]).toContain("nothing it puts up had reached a machine")
  expect(answer.refusals[1]).not.toContain("may be")
})

test("what a deploy put up is named in the refusal rather than counted", () => {
  expect(stoppedPartWay(["one", "two"])).toContain("one; two")
  expect(stoppedPartWay([])).not.toContain("what it put up")
})
