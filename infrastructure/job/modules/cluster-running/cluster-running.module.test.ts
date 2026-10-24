import { expect, test } from "bun:test"
import { ci } from "akasha/infrastructure/container-image/dockerfile/built-image/ci/ci.built-image.ts"
import { ROOT } from "akasha/infrastructure/container-image/dockerfile/modules/services/dockerfile-services.module.code.ts"
import { refOf } from "akasha/infrastructure/container-image/modules/image-ref/image-ref.module.code.ts"
import {
  activeArgv,
  applyArgv,
  besideEnded,
  carriedAt,
  checkedOut,
  endedBy,
  fateOf,
  imageHeldFor,
  jobRan,
  jobYamlFor,
  keptCheckout,
  logsArgv,
  waitArgv,
} from "akasha/infrastructure/job/modules/cluster-running/cluster-running.module.code.ts"
import {
  COMMIT,
  capturing,
  carried,
  pushed,
  ranOf,
  refusedPush,
  uncarried,
} from "akasha/infrastructure/job/modules/cluster-running/cluster-running.module.test-fixtures.ts"
import {
  IN_CLUSTER,
  NODE_NAME,
} from "akasha/infrastructure/job/modules/run-in-cluster/run-in-cluster.module.code.ts"

const NAME = "held-job-0123456789ab"

const YAML = "kind: Job\n"

const WAS = "89abcdef0123456789abcdef0123456789abcdef"

const SCRIPT = "echo held"

function scriptOf(commit: string, was: string | null): string {
  return checkedOut(commit, was).join("\n")
}

test("a job is put up by reading the manifest off standard input", () => {
  expect(applyArgv()).toEqual(["apply", "-f", "-"])
})

test("a job takes the repository from the git service inside the cluster", () => {
  expect(scriptOf(COMMIT, null)).toContain("git-transport.git.svc.cluster.local:3000")
})

test("no token is written into the checkout a job makes or keeps", () => {
  const origin = "http://git-transport.git.svc.cluster.local:3000/alan/akasha.git"
  for (const said of [scriptOf(COMMIT, null), keptCheckout(COMMIT).join("\n")]) {
    expect(said).toContain(`origin ${origin}`)
    expect(said).not.toContain("x-access-token")
    expect(said).not.toContain("GIT_ACCESS_TOKEN")
  }
})

test("a kept checkout whose origin held a token has that origin named again without one", () => {
  const said = keptCheckout(COMMIT)
  const named = said.findIndex((one) => one.includes("git remote set-url origin"))
  const fetched = said.findIndex((one) => one.includes("git fetch"))
  expect(named).toBeGreaterThan(-1)
  expect(named).toBeLessThan(fetched)
})

test("a job holding a kept checkout clears every lock git left there before git runs", () => {
  const said = keptCheckout(COMMIT)
  const held = said.findIndex((one) => one.startsWith("flock"))
  const cleared = said.findIndex((one) => one.includes("-name '*.lock' -delete"))
  const first = said.findIndex((one) => /(^|\s)git\s/.test(one))
  expect(held).toBeGreaterThan(-1)
  expect(cleared).toBeGreaterThan(held)
  expect(cleared).toBeLessThan(first)
})

test("every git call in a job reads the token from the job's environment when asked", () => {
  const said = jobYamlFor(NAME, SCRIPT)
  expect(said).toContain("GIT_CONFIG_KEY_0")
  expect(said).toContain("credential.helper")
  expect(said).toContain("password=$GIT_ACCESS_TOKEN")
  expect(said).toContain("username=x-access-token")
})

test("a job fetches into the history its disk keeps what that history lacks", () => {
  const said = scriptOf(COMMIT, null)
  expect(said).toContain("git init -q --bare /mirror/akasha.git")
  expect(said).toContain(`git fetch -q --no-tags origin '+refs/heads/*:refs/heads/*' ${COMMIT}`)
  expect(said).not.toContain("--shallow-since")
  expect(said).not.toContain("--depth")
})

test("a job takes the history's disk one fetch at a time, and lets it go before the run", () => {
  const said = checkedOut(COMMIT, null)
  const held = said.findIndex((one) => one.startsWith("flock 8"))
  const fetched = said.findIndex((one) => one.includes("git fetch"))
  const left = said.indexOf("exec 8>&-")
  const cloned = said.findIndex((one) => one.startsWith("git clone"))
  expect(held).toBeGreaterThan(-1)
  expect(held).toBeLessThan(fetched)
  expect(left).toBeGreaterThan(fetched)
  expect(left).toBeLessThan(cloned)
})

test("a job's tree reads its objects from the history its disk keeps", () => {
  const said = scriptOf(COMMIT, null)
  expect(said).toContain("git clone -q --shared --no-checkout /mirror/akasha.git /app/repo")
  expect(said).toContain(`git checkout -q --detach ${COMMIT}`)
})

test("the history its disk keeps loses no object a job's tree reads", () => {
  const said = scriptOf(COMMIT, null)
  expect(said).toContain("git config gc.auto 0")
  expect(said).toContain("git repack -q -d --geometric=2")
  expect(said).not.toContain("prune")
})

test("a job fetches an earlier commit it is handed where the history lacks it", () => {
  const said = scriptOf(COMMIT, WAS)
  expect(said).toContain(`git cat-file -e ${WAS}^{commit}`)
  expect(said.indexOf(`origin ${WAS}`)).toBeLessThan(said.indexOf("git clone"))
})

test("an earlier commit origin no longer carries leaves the rest of the job running", () => {
  expect(scriptOf(COMMIT, WAS)).toContain(`origin ${WAS} || true`)
})

test("a fetch of the commit the transport dropped is made again after a pause", () => {
  const said = scriptOf(COMMIT, null)
  expect(said).toContain("until git fetch -q --no-tags origin")
  expect(said).toContain("sleep $((tried * 5))")
})

test("a fetch made again past the tries named fails the job", () => {
  expect(scriptOf(COMMIT, null)).toContain('[ "$tried" -lt 6 ] || exit 1')
})

test("an earlier commit is fetched once", () => {
  expect(scriptOf(COMMIT, WAS)).not.toContain(`until git fetch -q --no-tags origin ${WAS}`)
  expect(scriptOf(COMMIT, COMMIT)).not.toContain("git cat-file")
})

test("a job naming no disk for the history mounts none", () => {
  expect(jobYamlFor(NAME, SCRIPT)).not.toContain("/mirror")
  expect(jobYamlFor(NAME, SCRIPT, null, null, 60, "held-disk")).toContain("claimName: held-disk")
})

test("an install that went well says nothing, and one that failed says all it said", () => {
  for (const said of [scriptOf(COMMIT, null), keptCheckout(COMMIT).join("\n")]) {
    expect(said).toContain("bun install --frozen-lockfile > /tmp/install.said 2>&1")
    expect(said).toContain("|| { cat /tmp/install.said; exit 1; }")
  }
})

test("a job builds no index, git carrying every index a page is read through", () => {
  expect(scriptOf(COMMIT, null)).not.toContain("index-building")
  expect(scriptOf(COMMIT, null)).not.toContain("index refresh")
})

test("a job runs the script it is handed", () => {
  expect(jobYamlFor(NAME, SCRIPT)).toContain(SCRIPT)
  expect(jobYamlFor(NAME, SCRIPT)).toContain(NAME)
})

test("a job that failed is not run again by the cluster", () => {
  expect(jobYamlFor(NAME, SCRIPT)).toContain("backoffLimit: 0")
})

test("a job bounds what that job carries", () => {
  expect(jobYamlFor(NAME, SCRIPT)).toContain("activeDeadlineSeconds")
})

test("the key a job decrypts a secret with is handed in from a secret", () => {
  expect(jobYamlFor(NAME, SCRIPT)).toContain("SOPS_AGE_KEY")
  expect(jobYamlFor(NAME, SCRIPT)).not.toContain("AGE-SECRET-KEY")
})

test("the memory a landing starts on is read from the pod", () => {
  expect(jobYamlFor(NAME, SCRIPT)).toContain("LANDING_MIN_FREE_MEMORY_GB")
})

test("a job states that the run it carries is the one in the cluster", () => {
  expect(jobYamlFor(NAME, SCRIPT)).toContain(IN_CLUSTER)
})

test("a job states the node the cluster put it on in the run's environment", () => {
  const said = jobYamlFor(NAME, SCRIPT)
  expect(said).toContain(NODE_NAME)
  expect(said).toContain("fieldPath: spec.nodeName")
})

test("a job acts as the account it is handed, and a job handed none holds no token", () => {
  expect(jobYamlFor(NAME, SCRIPT)).toContain("serviceAccountName: deploy-account")
  expect(jobYamlFor(NAME, SCRIPT)).not.toContain("automountServiceAccountToken")
  const bare = jobYamlFor(NAME, SCRIPT, null, null)
  expect(bare).toContain("automountServiceAccountToken: false")
  expect(bare).not.toContain("serviceAccountName")
})

test("a job holds every privilege the node gives a container", () => {
  expect(jobYamlFor(NAME, SCRIPT)).toContain("privileged: true")
})

test("the wait names the job, its namespace and how long it is waited on", () => {
  const said = waitArgv(NAME, "condition=Complete", "30m")
  expect(said).toContain(`job/${NAME}`)
  expect(said).toContain("--timeout=30m")
  expect(said).toContain("workers")
})

test("a job that failed is seen on the round it failed rather than after the whole wait", async () => {
  const held = capturing((argv) => ranOf(argv.includes("--for=condition=Failed") ? 0 : 1))
  expect(await fateOf(held.running, NAME, 180)).toBe("failed")
  expect(held.seen.length).toBe(2)
})

test("a job still running past every round is answered as running", async () => {
  const held = capturing(() => ranOf(1))
  expect(await fateOf(held.running, NAME, 3)).toBe("running")
  expect(held.seen.length).toBe(6)
})

test("a line the caller listens for is heard once, on the round the job first says it", async () => {
  let rounds = 0
  const held = capturing((argv) => {
    if (argv[0] === "logs") {
      rounds += 1
      return ranOf(0, rounds < 2 ? "busy\n" : "busy\nmarked\tabc\n")
    }
    return ranOf(1)
  })
  let heard = 0
  const hearing = {
    started: () => undefined,
    said: "marked",
    heard: (): undefined => {
      heard += 1
    },
  }
  expect(await fateOf(held.running, NAME, 4, hearing)).toBe("running")
  expect(heard).toBe(1)
  expect(held.seen.filter((one) => one[0] === "logs").length).toBe(2)
})

test("every line the job said is read rather than the last few", () => {
  expect(logsArgv(NAME)).toContain("--tail=-1")
})

test("a job that ended has its lines carried back", () => {
  expect(endedBy("complete", ranOf(0, "one\ntwo\n"), NAME)).toEqual({ said: ["one", "two"] })
})

test("a job that failed refuses the run, and the lines still come back", () => {
  const held = endedBy("failed", ranOf(0, "why\n"), NAME) as { why: string }
  expect(held.why).toContain(NAME)
  expect(held.why).toContain("why")
})

test("a job that failed after a line saying its work finished answers as ended", () => {
  const finished = (said: readonly string[]): boolean => said.includes("done")
  expect(endedBy("failed", ranOf(0, "a\ndone\n"), NAME, finished)).toEqual({ said: ["a", "done"] })
  expect("why" in endedBy("failed", ranOf(0, "a\n"), NAME, finished)).toBe(true)
})

test("a job left running past the wait refuses the run", () => {
  const held = endedBy("running", ranOf(0), NAME) as { why: string }
  expect(held.why).toContain("had not ended")
})

test("a commit origin carries is carried with no push", () => {
  let pushes = 0
  expect(
    carriedAt(ROOT, COMMIT, carried, (root) => {
      pushes += 1
      return pushed(root)
    })
  ).toBe(null)
  expect(pushes).toBe(0)
})

test("a commit origin does not carry is pushed there, and then carried", () => {
  let asked = 0
  expect(
    carriedAt(
      ROOT,
      COMMIT,
      () => {
        asked += 1
        return { carried: asked > 1 }
      },
      pushed
    )
  ).toBe(null)
  expect(asked).toBe(2)
})

test("a commit origin still does not carry after the push refuses the run", () => {
  const why = carriedAt(ROOT, COMMIT, uncarried, pushed)
  expect(why).toContain(COMMIT)
  expect(why).toContain("no job in the cluster can read it")
})

test("a push that failed refuses the run and says what the push said", () => {
  const why = carriedAt(ROOT, COMMIT, uncarried, refusedPush)
  expect(why).toContain(COMMIT)
  expect(why).toContain("refused")
})

test("a push another writer of that commit won leaves the commit carried", () => {
  let asked = 0
  const carriedAfter = (): { readonly carried: boolean } => {
    asked += 1
    return { carried: asked > 1 }
  }
  expect(carriedAt(ROOT, COMMIT, carriedAfter, refusedPush)).toBe(null)
  expect(asked).toBe(2)
})

test("a commit origin carries is applied and then waited on", async () => {
  const held = capturing()
  const said = await jobRan(ROOT, COMMIT, NAME, YAML, 1, held.running, carried, pushed)
  expect(said).toEqual({ said: [] })
  expect(held.seen[0]).toEqual(["apply", "-f", "-"])
  expect(held.sent()).toBe(YAML)
})

test("a job the cluster would not take refuses the run by name", async () => {
  const held = capturing((argv) => (argv[0] === "apply" ? ranOf(1, "", "nope") : ranOf(0)))
  const said = (await jobRan(ROOT, COMMIT, NAME, YAML, 1, held.running, carried, pushed)) as {
    why: string
  }
  expect(said.why).toContain(NAME)
  expect(said.why).toContain("nope")
})

const BESIDE = /^held-job-[0-9a-f]{12}$/

const OTHER = "held-job-fedcba987654"

function listing(active: string): (argv: readonly string[]) => ReturnType<typeof ranOf> {
  return (argv) => {
    if (argv[0] === "get") return ranOf(0, active)
    return ranOf(argv.includes("--for=condition=Failed") ? 1 : 0)
  }
}

test("a job running beside one is waited on to its end before that one goes up", async () => {
  const held = capturing(listing(`${OTHER}\nunrelated-job\n`))
  await jobRan(ROOT, COMMIT, NAME, YAML, 1, held.running, carried, pushed, BESIDE)
  const verbs = held.seen.map((one) => one[0])
  expect(verbs).toEqual(["get", "wait", "apply", "wait", "logs"])
  expect(held.seen[1]).toContain(`job/${OTHER}`)
})

test("a job is never waited on beside itself, nor beside a job of another name", async () => {
  const held = capturing(listing(`${NAME}\nunrelated-job\n`))
  expect(await besideEnded(held.running, NAME, BESIDE, 1)).toEqual([])
  expect(held.seen.length).toBe(1)
})

test("a job naming none to wait beside asks the cluster for no other job", async () => {
  const held = capturing()
  await jobRan(ROOT, COMMIT, NAME, YAML, 1, held.running, carried, pushed)
  expect(held.seen.some((one) => one[0] === "get")).toBe(false)
})

test("the jobs beside are the ones the cluster says are running", () => {
  expect(activeArgv().join(" ")).toContain("@.status.active")
})

test("a commit that reaches origin nowhere puts no job up", async () => {
  const held = capturing()
  await jobRan(ROOT, COMMIT, NAME, YAML, 1, held.running, uncarried, pushed)
  expect(held.seen).toEqual([])
})

test("a job names the ci image at the hash of that image's build inputs", () => {
  expect(jobYamlFor(NAME, SCRIPT)).toContain(refOf(ci))
  expect(refOf(ci)).toMatch(/\/cluster\/ci:[0-9a-f]{12}$/)
})

test("a job names no image by a tag that moves", () => {
  expect(jobYamlFor(NAME, SCRIPT)).not.toContain("cluster/ci:latest")
})

test("a manifest naming no image of this system's reaches no registry", async () => {
  expect(await imageHeldFor(YAML, ROOT)).toBe(null)
})
