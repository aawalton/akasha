export interface DomainOwnerWalk {
  readonly declared: boolean
  readonly persona: string | null
  readonly at: string | null
}

export type DomainLead =
  | { readonly kind: "lead"; readonly handle: string }
  | { readonly kind: "unresolved"; readonly reason: string }

export function decideDomainLead(domain: string, walk: DomainOwnerWalk): DomainLead {
  const wanted = domain.trim()
  if (wanted.length === 0) {
    return { kind: "unresolved", reason: "no domain was named, so no persona can be derived." }
  }

  if (!walk.declared) {
    return {
      kind: "unresolved",
      reason:
        `no document declares 'slug: ${wanted}', so there is no domain to derive a persona ` +
        "from. Either the slug is spelled differently in the pages, or nothing by that name exists.",
    }
  }

  const handle = (walk.persona ?? "").trim()
  if (handle.length === 0) {
    return {
      kind: "unresolved",
      reason:
        `the descent from '${wanted}' reached no document naming a 'persona-champion-slug:'. ` +
        "The root domain names one, so this reports a tree that has lost it rather than a domain " +
        "nobody owns.",
    }
  }

  return { kind: "lead", handle }
}

export interface DerivedRecipient {
  readonly handle: string
  readonly defaultedBecause: string | null
}

export function recipientFromLead(lead: DomainLead, defaultHandle: string): DerivedRecipient {
  if (lead.kind === "lead") return { handle: lead.handle, defaultedBecause: null }
  return {
    handle: defaultHandle.trim(),
    defaultedBecause: `${lead.reason} Fell back to the stated default '${defaultHandle.trim()}'.`,
  }
}
