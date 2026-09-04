import type {
  KeyBindingDescriptor,
  KeyLayer,
} from "../keyboard-registry/keyboard-registry.module.code.ts"

export const LAYER_ORDER: readonly KeyLayer[] = ["reserved", "conventional", "house"]

export const LAYER_LABELS: Record<KeyLayer, string> = {
  reserved: "Reserved",
  conventional: "Conventional",
  house: "House",
}

export interface DescriptorGroup {
  group: string | null
  descriptors: readonly KeyBindingDescriptor[]
}

export interface LayerSection {
  layer: KeyLayer | null
  label: string
  groups: readonly DescriptorGroup[]
}

function toGroups(descriptors: readonly KeyBindingDescriptor[]): readonly DescriptorGroup[] {
  const byGroup = new Map<string | null, KeyBindingDescriptor[]>()
  for (const descriptor of descriptors) {
    const key = descriptor.group ?? null
    const bucket = byGroup.get(key)
    if (bucket === undefined) byGroup.set(key, [descriptor])
    else bucket.push(descriptor)
  }
  return [...byGroup.entries()].map(([key, group]) => ({
    group: key,
    descriptors: group,
  }))
}

export function isChorded(descriptor: KeyBindingDescriptor): boolean {
  return descriptor.chord.key.length > 0
}

export function groupByLayerAndGroup(
  descriptors: readonly KeyBindingDescriptor[]
): readonly LayerSection[] {
  const sections: LayerSection[] = []
  for (const layer of LAYER_ORDER) {
    const inLayer = descriptors.filter((descriptor) => descriptor.layer === layer)
    if (inLayer.length > 0) {
      sections.push({ layer, label: LAYER_LABELS[layer], groups: toGroups(inLayer) })
    }
  }
  const layerless = descriptors.filter((descriptor) => descriptor.layer == null)
  if (layerless.length > 0) {
    sections.push({ layer: null, label: "Other", groups: toGroups(layerless) })
  }
  return sections
}

export function fuzzyMatchLabel(query: string, label: string): boolean {
  const needle = query.trim().toLowerCase()
  if (needle.length === 0) return true
  const haystack = label.toLowerCase()
  let cursor = 0
  for (const char of haystack) {
    if (char === needle[cursor]) {
      cursor++
      if (cursor === needle.length) return true
    }
  }
  return false
}

export function filterDescriptorsByLabel(
  descriptors: readonly KeyBindingDescriptor[],
  query: string
): readonly KeyBindingDescriptor[] {
  return descriptors.filter((descriptor) => fuzzyMatchLabel(query, descriptor.label))
}
