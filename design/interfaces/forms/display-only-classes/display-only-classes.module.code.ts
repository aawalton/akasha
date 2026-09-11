const DISPLAY_ONLY_CLASS_RE = /^(truncate|overflow-hidden|select-none|max-w-)/

export function stripDisplayOnlyClasses(className: string | undefined): string {
  if (className == null) return ""
  return className
    .split(" ")
    .filter((cls) => !DISPLAY_ONLY_CLASS_RE.test(cls))
    .join(" ")
}
