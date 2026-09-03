export function portraitSrc(portrait: string): string {
  return portrait.startsWith("/") ? portrait : `/${portrait}`
}
