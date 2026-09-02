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

export function fireContentNotification(gameTitle: string, tag: string): undefined {
  if (!notificationSupported()) return
  if (Notification.permission !== "granted") return
  if (typeof document !== "undefined" && document.hasFocus()) return
  try {
    void new Notification(gameTitle, {
      body: "A new turn is ready.",
      tag,
      requireInteraction: true,
    })
  } catch {}
}
