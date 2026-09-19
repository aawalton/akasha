const MANAGED = "persona-auto: "

const LITERAL = "literal"

const TO = "to"

const FORWARD = "forward"

export interface RoutingMatcher {
  readonly type: string
  readonly field?: string
  readonly value?: string
}

export interface RoutingAction {
  readonly type: string
  readonly value?: readonly string[]
}

export interface RoutingRule {
  readonly name?: string
  readonly enabled?: boolean
  readonly matchers: readonly RoutingMatcher[]
  readonly actions: readonly RoutingAction[]
}

export interface RuleToWrite {
  readonly name: string
  readonly enabled: boolean
  readonly matchers: readonly RoutingMatcher[]
  readonly actions: readonly RoutingAction[]
}

export interface Declaring {
  readonly email: string | null
}

export interface Writing {
  readonly address: string
  readonly rule: RuleToWrite
}

export interface Plan {
  readonly writing: readonly Writing[]
  readonly routed: readonly string[]
  readonly off: readonly string[]
  readonly unclaimed: readonly string[]
}

export function addressIn(rule: RoutingRule): string | null {
  for (const matcher of rule.matchers) {
    if (matcher.type === LITERAL && matcher.field === TO && matcher.value !== undefined) {
      return matcher.value.toLowerCase()
    }
  }
  return null
}

export function addressesDeclared(
  declaring: readonly Declaring[],
  domain: string
): readonly string[] {
  const at = `@${domain}`
  const held = new Set<string>()
  for (const one of declaring) {
    if (one.email === null) continue
    const email = one.email.toLowerCase()
    if (email.endsWith(at)) held.add(email)
  }
  return [...held].sort()
}

function routedBy(rules: readonly RoutingRule[]): ReadonlyMap<string, boolean> {
  const routed = new Map<string, boolean>()
  for (const rule of rules) {
    const address = addressIn(rule)
    if (address === null) continue
    routed.set(address, (routed.get(address) ?? false) || rule.enabled === true)
  }
  return routed
}

function destinationsIn(rules: readonly RoutingRule[]): ReadonlySet<string> {
  const held = new Set<string>()
  for (const rule of rules) {
    for (const action of rule.actions) {
      if (action.type !== FORWARD) continue
      for (const one of action.value ?? []) held.add(one.toLowerCase())
    }
  }
  return held
}

export function forwardedTo(rules: readonly RoutingRule[]): string {
  const managed = rules.filter((rule) => rule.name?.startsWith(MANAGED) === true)
  const held = destinationsIn(managed.length === 0 ? rules : managed)
  if (held.size > 1) {
    throw new Error(
      `${String(held.size)} addresses are forwarded to, so which one a new rule copies is unsettled`
    )
  }
  const one = [...held][0]
  if (one === undefined) {
    throw new Error(
      "no rule in the zone forwards anywhere, so there is nothing to copy a destination from"
    )
  }
  return one
}

export function namedFor(address: string, destination: string): string {
  return `${MANAGED}${address} -> ${destination}`
}

function ruleFor(address: string, destination: string): RuleToWrite {
  return {
    name: namedFor(address, destination),
    enabled: true,
    matchers: [{ type: LITERAL, field: TO, value: address }],
    actions: [{ type: FORWARD, value: [destination] }],
  }
}

export function plannedOver(
  declared: readonly string[],
  rules: readonly RoutingRule[],
  destination: string
): Plan {
  const already = routedBy(rules)
  const writing: Writing[] = []
  const routed: string[] = []
  const off: string[] = []
  for (const address of declared) {
    const enabled = already.get(address)
    if (enabled === undefined) writing.push({ address, rule: ruleFor(address, destination) })
    else if (enabled) routed.push(address)
    else off.push(address)
  }
  const wanted = new Set(declared)
  const unclaimed = [...already.keys()].filter((one) => !wanted.has(one)).sort()
  return { writing, routed, off, unclaimed }
}

function countedAs(many: number, one: string, rest: string): string {
  return `${String(many)} ${many === 1 ? one : rest}`
}

export function saidOf(plan: Plan): readonly string[] {
  const said = [`${countedAs(plan.writing.length, "address", "addresses")} routed`]
  for (const one of plan.writing) said.push(`  routed ${one.address}`)
  said.push(`${countedAs(plan.routed.length, "address", "addresses")} already routed`)
  for (const one of plan.off) said.push(`  ${one} is claimed by a rule that is turned off`)
  for (const one of plan.unclaimed) {
    said.push(`  ${one} is routed and no persona declares it, so it is left as it is`)
  }
  return said
}
