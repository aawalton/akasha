export type AlertPermission = NotificationPermission | "unsupported"

function notificationSupported(): boolean {
  return typeof window !== "undefined" && "Notification" in window
}

export function notificationPermission(): AlertPermission {
  if (!notificationSupported()) return "unsupported"
  return Notification.permission
}

export async function requestNotificationPermission(): Promise<AlertPermission> {
  if (!notificationSupported()) return "unsupported"
  try {
    return await Notification.requestPermission()
  } catch {
    return notificationPermission()
  }
}

function whereShown(): string {
  return `${window.location.pathname}${window.location.search}`
}

export function fireContentNotification(title: string, body: string, tag: string): undefined {
  if (!notificationSupported()) return
  if (Notification.permission !== "granted") return
  if (typeof document !== "undefined" && document.hasFocus()) return
  const shownAt = whereShown()
  try {
    const notice = new Notification(title, { body, tag, requireInteraction: true })
    notice.onclick = () => {
      window.focus()
      if (whereShown() !== shownAt) window.location.assign(shownAt)
      notice.close()
    }
  } catch {}
}
