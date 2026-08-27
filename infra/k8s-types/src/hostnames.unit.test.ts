import { describe, expect, test } from "bun:test"
import { asHostname, CI_RESERVED_NODE, CNPG_POSTGRES_PRIMARY_LABELS, capabilitySelector, colocationAffinity, colocationAffinityPreferred, HOSTNAME_KEY, HOSTNAMES, type Hostname, hostnameSelector, WORKLOAD_CLASS_KEY, WORKLOAD_CLASS_MEMBER_PREFIX, WORKLOAD_CLASSES, type WorkloadClass, workloadClassMemberKey, workloadClassMemberSelector, yamlHostnamePinLines, yamlWorkloadClassMemberPinLines } from "./hostnames"
import { CI_ENROLLMENT_KEY, ciEnrollmentCandidateLabel } from "./hostnames-ci-enrollment"

describe("HOSTNAME_KEY", () => {
  test("is the K8s well-known hostname label", () => {
    expect(HOSTNAME_KEY).toBe(["kubernetes.io", "hostname"].join("/"))
  })
})

describe("HOSTNAMES", () => {
  test("contains exactly 6 entries", () => {
    expect(HOSTNAMES).toHaveLength(6)
  })

  test("includes node-01 through node-06 in order", () => {
    expect([...HOSTNAMES]).toEqual([
      "node-01",
      "node-02",
      "node-03",
      "node-04",
      "node-05",
      "node-06",
    ])
  })
})

describe("hostnameSelector", () => {
  test("returns the K8s nodeSelector object literal", () => {
    expect(hostnameSelector("node-04")).toEqual({ [HOSTNAME_KEY]: "node-04" })
  })

  test("rejects a non-Hostname literal at the type level", () => {
    // @ts-expect-error — "node-99" is not a Hostname
    hostnameSelector("node-99")
  })
})

describe("yamlHostnamePinLines", () => {
  test("emits two indented yaml lines", () => {
    expect(yamlHostnamePinLines("node-02", "      ")).toEqual([
      "      nodeSelector:",
      "        kubernetes.io/hostname: node-02",
    ])
  })

  test("respects a different indent", () => {
    expect(yamlHostnamePinLines("node-06", "  ")).toEqual([
      "  nodeSelector:",
      "    kubernetes.io/hostname: node-06",
    ])
  })
})

describe("WORKLOAD_CLASS_KEY", () => {
  test("is the alanwalton.com workload-class label", () => {
    expect(WORKLOAD_CLASS_KEY).toBe(["alanwalton.com", "workload-class"].join("/"))
  })
})

describe("WORKLOAD_CLASSES", () => {
  test("contains exactly 7 entries (six node-purposes plus one membership-only class)", () => {
    expect(WORKLOAD_CLASSES).toHaveLength(7)
  })

  test("matches the workload-class labels applied to the nodes via Talos machine-config", () => {
    expect([...WORKLOAD_CLASSES]).toEqual([
      "control",
      "database",
      "build",
      "serve",
      "workers",
      "ci",
      "eso-rig",
    ])
  })
})

describe("capabilitySelector", () => {
  test("returns the K8s nodeSelector object literal for a workload-class", () => {
    expect(capabilitySelector("database")).toEqual({ [WORKLOAD_CLASS_KEY]: "database" })
  })

  test("rejects a non-WorkloadClass literal at the type level", () => {
    // @ts-expect-error — "databse" is not a WorkloadClass
    capabilitySelector("databse")
  })
})

describe("WORKLOAD_CLASS_MEMBER_PREFIX", () => {
  test("is the bare workload-class key plus a trailing dot", () => {
    expect(WORKLOAD_CLASS_MEMBER_PREFIX).toBe(`${WORKLOAD_CLASS_KEY}.`)
  })

  test("is disjoint from the bare WORKLOAD_CLASS_KEY (the dot keeps them apart)", () => {
    expect(WORKLOAD_CLASS_MEMBER_PREFIX).not.toBe(WORKLOAD_CLASS_KEY)
  })
})

describe("workloadClassMemberKey", () => {
  test("returns the membership prefix plus the class for several classes", () => {
    expect(workloadClassMemberKey("database")).toBe(`${WORKLOAD_CLASS_MEMBER_PREFIX}database`)
    expect(workloadClassMemberKey("ci")).toBe(`${WORKLOAD_CLASS_MEMBER_PREFIX}ci`)
    expect(workloadClassMemberKey("control")).toBe(`${WORKLOAD_CLASS_MEMBER_PREFIX}control`)
  })

  test("output starts with WORKLOAD_CLASS_MEMBER_PREFIX", () => {
    for (const c of WORKLOAD_CLASSES) {
      expect(workloadClassMemberKey(c).startsWith(WORKLOAD_CLASS_MEMBER_PREFIX)).toBe(true)
    }
  })

  test("rejects a non-WorkloadClass literal at the type level", () => {
    // @ts-expect-error — "databse" is not a WorkloadClass
    workloadClassMemberKey("databse")
  })
})

describe("workloadClassMemberSelector", () => {
  test('returns the membership nodeSelector object literal with value "true"', () => {
    expect(workloadClassMemberSelector("database")).toEqual({
      [workloadClassMemberKey("database")]: "true",
    })
  })

  test('has exactly one key whose value is the string "true"', () => {
    const sel = workloadClassMemberSelector("database")
    const keys = Object.keys(sel)
    expect(keys).toHaveLength(1)
    expect(Object.values(sel)).toEqual(["true"])
  })

  test("rejects a non-WorkloadClass literal at the type level", () => {
    // @ts-expect-error — "databse" is not a WorkloadClass
    workloadClassMemberSelector("databse")
  })
})

describe("yamlWorkloadClassMemberPinLines", () => {
  test('emits two indented yaml lines with the quoted "true" value', () => {
    expect(yamlWorkloadClassMemberPinLines("ci", "      ")).toEqual([
      "      nodeSelector:",
      `        ${workloadClassMemberKey("ci")}: "true"`,
    ])
  })

  test("respects a different indent", () => {
    expect(yamlWorkloadClassMemberPinLines("build", "  ")).toEqual([
      "  nodeSelector:",
      `    ${workloadClassMemberKey("build")}: "true"`,
    ])
  })

  test("rejects a non-WorkloadClass literal at the type level", () => {
    // @ts-expect-error — "ciii" is not a WorkloadClass
    yamlWorkloadClassMemberPinLines("ciii", "  ")
  })
})

describe("colocationAffinity", () => {
  test("builds a required podAffinity term colocating on the target pod's node", () => {
    expect(colocationAffinity({ app: "postgres" }, ["postgres"])).toEqual({
      podAffinity: {
        requiredDuringSchedulingIgnoredDuringExecution: [
          {
            labelSelector: { matchLabels: { app: "postgres" } },
            namespaces: ["postgres"],
            topologyKey: HOSTNAME_KEY,
          },
        ],
      },
    })
  })

  test("passes the matchLabels and namespaces through verbatim", () => {
    const a = colocationAffinity({ "app.kubernetes.io/instance": "pg" }, ["db", "other"])
    const term = a.podAffinity.requiredDuringSchedulingIgnoredDuringExecution[0]
    expect(term.labelSelector.matchLabels).toEqual({ "app.kubernetes.io/instance": "pg" })
    expect([...term.namespaces]).toEqual(["db", "other"])
  })
})

describe("CI_ENROLLMENT_KEY", () => {
  test("is the alanwalton.com ci-enrollment stage label", () => {
    expect(CI_ENROLLMENT_KEY).toBe(["alanwalton.com", "ci-enrollment"].join("/"))
  })

  test("is disjoint from the workload-class key namespace (never a live class)", () => {
    expect(CI_ENROLLMENT_KEY.startsWith(WORKLOAD_CLASS_MEMBER_PREFIX)).toBe(false)
    expect(CI_ENROLLMENT_KEY).not.toBe(WORKLOAD_CLASS_KEY)
  })
})

describe("ciEnrollmentCandidateLabel", () => {
  test("returns the single-key candidate enrollment marker", () => {
    expect(ciEnrollmentCandidateLabel()).toEqual({ [CI_ENROLLMENT_KEY]: "candidate" })
  })

  test("carries exactly one key whose value is the string 'candidate'", () => {
    const label = ciEnrollmentCandidateLabel()
    expect(Object.keys(label)).toHaveLength(1)
    expect(Object.values(label)).toEqual(["candidate"])
  })

  test("is inert: its key matches no workload-class selector the dispatcher reads", () => {
    for (const c of WORKLOAD_CLASSES) {
      expect(CI_ENROLLMENT_KEY).not.toBe(workloadClassMemberKey(c))
    }
  })
})

describe("CNPG_POSTGRES_PRIMARY_LABELS", () => {
  test("is the CNPG primary-instance anchor for the postgres-cnpg cluster", () => {
    expect(CNPG_POSTGRES_PRIMARY_LABELS).toEqual({
      "cnpg.io/cluster": "postgres-cnpg",
      "cnpg.io/instanceRole": "primary",
    })
  })
})

describe("colocationAffinityPreferred", () => {
  test("builds a preferred (soft) podAffinity term colocating on the target pod's node", () => {
    expect(colocationAffinityPreferred(CNPG_POSTGRES_PRIMARY_LABELS, ["postgres"])).toEqual({
      podAffinity: {
        preferredDuringSchedulingIgnoredDuringExecution: [
          {
            weight: 100,
            podAffinityTerm: {
              labelSelector: {
                matchLabels: {
                  "cnpg.io/cluster": "postgres-cnpg",
                  "cnpg.io/instanceRole": "primary",
                },
              },
              namespaces: ["postgres"],
              topologyKey: HOSTNAME_KEY,
            },
          },
        ],
      },
    })
  })

  test("passes the matchLabels and namespaces through verbatim", () => {
    const a = colocationAffinityPreferred({ "app.kubernetes.io/instance": "pg" }, ["db", "other"])
    const term = a.podAffinity.preferredDuringSchedulingIgnoredDuringExecution[0]
    expect(term.podAffinityTerm.labelSelector.matchLabels).toEqual({
      "app.kubernetes.io/instance": "pg",
    })
    expect([...term.podAffinityTerm.namespaces]).toEqual(["db", "other"])
  })
})

describe("CI_RESERVED_NODE", () => {
  test("is node-06 — the node merge-queue/staging + main pipelines prefer", () => {
    expect(CI_RESERVED_NODE).toBe("node-06")
  })

  test("is a member of the Hostname union", () => {
    expect(HOSTNAMES).toContain(CI_RESERVED_NODE)
  })
})

describe("asHostname", () => {
  test("returns the branded Hostname for a known cluster node", () => {
    expect(asHostname("node-03")).toBe("node-03")
    expect(asHostname("node-06")).toBe("node-06")
  })

  test("returns undefined for a string that is not a cluster hostname", () => {
    expect(asHostname("totally-bogus")).toBeUndefined()
    expect(asHostname("")).toBeUndefined()
    expect(asHostname("node-07")).toBeUndefined()
    expect(asHostname("NODE-06")).toBeUndefined()
  })

  test("round-trips every HOSTNAMES entry", () => {
    for (const h of HOSTNAMES) {
      expect(asHostname(h)).toBe(h)
    }
  })
})

const _hostnameRoundTrip: Hostname = HOSTNAMES[0]
void _hostnameRoundTrip

const _workloadClassRoundTrip: WorkloadClass = WORKLOAD_CLASSES[0]
void _workloadClassRoundTrip
