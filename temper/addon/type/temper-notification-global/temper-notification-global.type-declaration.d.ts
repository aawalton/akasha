interface TemperNotificationProvider {
  notifications: unknown[]
  UpdateNotifications: () => void
}

interface TemperNotification {
  CreateProvider: () => TemperNotificationProvider
}

declare const TemperNotification: TemperNotification

declare const NOTIFICATIONS_REQUEST_DATA: number
